
import * as PptxGenJS from 'pptxgenjs';
import { Injectable } from '@angular/core';
import html2canvas from "html2canvas";
import * as $ from 'jquery';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PptService {
  yOffset: number;
  slide: any;
  doc: any;
  canvassesForDesktopTables: any[];
  canvassesForMobileTables: any[];

  constructor() {
    this.doc = new PptxGenJS();
    this.slide = this.doc.addNewSlide();
    this.yOffset = 0;
  }

  public generatePptForDesktop() {
    this.expandDetails();
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    $(".rating-help-icon").hide();

    this.writeHeadingsForDesktop();
    this.writeWarnings();
    this.generateCanvassesForDesktopTables().subscribe(() => {
      this.writeTableFromCanvasForDesktop("criteriaTable");
      this.save();
      $("#downloadPage").text(" Download page");
      $("body").css("cursor", "");
      $(".rating-help-icon").show();
    });
  }

  private writeHeadingsForDesktop() {
    this.yOffset += 0.5;
    this.slide.addText($('#h1').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 18, bold: true });
    if ($('#dateCaption').length > 0) {
      this.yOffset += 0.5;
      this.slide.addText($('#dateCaption').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 14, bold: true });
    }

    let assessingText = $('#assessing').get(0).innerText;
    let part1 = assessingText.substring(0, assessingText.indexOf('.') + 1);
    let part2 = assessingText.substring(assessingText.indexOf('.') + 2);
    this.yOffset += 0.5;
    this.slide.addText(part1, { x: 0.2, y: this.yOffset, fontSize: 14, bold: true });
    if (part2) {
      this.slide.addText(part2, { x: 0.2, y: this.yOffset, fontSize: 14, bold: true });
    }
  }

  private writeWarnings() {
    this.yOffset += 0.5;
    if ($('#partialWarning').length > 0) {
      let warningText = $('#partialWarning__text').get(0).innerText;
      let part1 = warningText.substring(0, warningText.indexOf('.') + 1);
      let part2 = warningText.substring(warningText.indexOf('.') + 2);
      this.slide.addText(part1, { x: 0.2, y: this.yOffset, fontSize: 18, bold: false });
      if (part2) {
        this.slide.addText(part2, { x: 0.2, y: this.yOffset, fontSize: 18, bold: false });
      }
    }
  }


  public generatePptForMobile() {
  }

  private writeTableFromCanvasForDesktop(id: string) {
    let canvas = this.canvassesForDesktopTables.find(ct => ct.id === id).canvas;
    if (this.yOffset + canvas.height > 900) {
      this.slide = this.doc.addNewSlide();
    }
    this.pptAddImage(canvas);
    this.yOffset += canvas.height + 50;
  }

  private generateCanvassesForDesktopTables() {
    this.canvassesForDesktopTables = [
      { id: "criteriaTable" },
      { id: "reserveTable" },
      { id: "spendingTable" },
      { id: "charTable" },
      { id: "outcomesTable" }
    ]

    return from(new Promise<void>((resolve) => {
      this.canvassesForDesktopTables.forEach(tableCanvas => {
        this.pptGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForDesktopTables.every(ct => ct.canvas)) {
            resolve();
          }
        })
      });
    }));
  }

  private pptAddImage(canvas: any){
    let img = canvas.toDataURL("image/png");
    let ratio = canvas.width / canvas.height;
    this.yOffset += 0.3;
    let width = 4.5;
    let height = 4.5 / ratio;
    if (height > 5) {
        height = 5;
        width = height * ratio;
    }
    this.slide.addImage({ data: img, x: 0.5, y: this.yOffset, w: width, h: height });

  }

  private save() {
    this.doc.save('Self-assessment-dashboard');
  }

  private expandDetails() {
    let detailses = document.getElementsByTagName("details");
    let details;
    var i = -1;
    while (details = detailses[++i]) {
      details["open"] = true;
    }
  }

  private pptGenerateImage(elementId) {
    let element = $(elementId)[0];
    return html2canvas(element, {
      imageTimeout: 20000,
      removeContainer: false,
      width: element.clientWidth,
      height: element.clientHeight,
      allowTaint: true,
      scale: 1
    });
  }
}
