
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

  constructor() { }

  private initDoc() {
    this.doc = new PptxGenJS();
    this.slide = this.doc.addNewSlide();
    this.yOffset = 0;
  }

  public generatePptForMobile() {
    this.initDoc();
    this.expandDetails();
    this.preparePage();
    this.generateCanvassesForMobileTables().subscribe(() => {
      this.writeHeadingsForMobile();
      this.writeTableFromCanvasForMobile("criteriaTables");
      this.pptAddNewSlide();
      this.writeScenarioNameYear();
      this.writeTableFromCanvasForMobile("page1Tables");
      this.pptAddNewSlide();
      this.writeTableFromCanvasForMobile("page2Tables");
      this.pptAddNewSlide();
      this.writeTableFromCanvasForMobile("page3Tables");

      this.pptSave();

      this.restorePage();

    });
  }

  public generatePptForDesktop() {
    this.initDoc();
    this.expandDetails();
    this.preparePage();

    this.generateCanvassesForDesktopTables().subscribe(() => {
      this.writeHeadingsForDesktop();
      this.writeTableFromCanvasForDesktop("criteriaTable");
      this.pptAddNewSlide();
      this.writeScenarioNameYear();
      this.writeTableFromCanvasForDesktop("reserveTable");
      this.pptAddNewSlide();
      this.writeTableFromCanvasForDesktop("spendingTable");
      this.pptAddNewSlide();
      this.writeTableFromCanvasForDesktop("charTable");
      this.pptAddNewSlide();
      this.writeTableFromCanvasForDesktop("outcomesTable");

      this.pptSave();

      this.restorePage();

    });
  }

  private restorePage() {
    $("body").css("cursor", "");
    $(".rating-help-icon").show();
  }

  private preparePage() {
    $("body").css("cursor", "wait");
    $(".rating-help-icon").hide();
  }

  private writeHeadingsForDesktop() {
    this.yOffset += 0.5;
    this.slide.addText($('#h1').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 22, bold: true });

    this.yOffset += 0.7;
    let assessingText = $('#assessing').get(0).innerText;
    this.slide.addText(assessingText, { x: 0.2, y: this.yOffset, fontSize: 10, bold: false });

    this.yOffset += 0.5;
  }

  private writeHeadingsForMobile() {
    this.yOffset += 0.3;
    this.slide.addText($('#h1').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 22, bold: true });

    this.yOffset += 0.3;
    let assessingText = $('#assessing').get(0).innerText;
    this.slide.addText(assessingText, { x: 0.2, y: this.yOffset, fontSize: 10, bold: false });

    this.yOffset += 0.2;
  }

  private writeScenarioNameYear() {
    if ($('#scenarioName').length > 0) {
      this.yOffset += 0.3;
      this.slide.addText($('#scenarioName').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 14, bold: true });
      this.yOffset += 0.3;
    }
    if ($('#scenarioYear').length > 0) {
      this.slide.addText($('#scenarioYear').get(0).innerText, { x: 0.2, y: this.yOffset, fontSize: 12, bold: false });
      this.yOffset += 0.1;
    }
    this.yOffset += 0.3;
  }

  private writeTableFromCanvasForDesktop(id: string) {
    let canvas = this.canvassesForDesktopTables.find(ct => ct.id === id).canvas;
    this.pptAddImageForDesktop(canvas);
    this.yOffset += canvas.height + 10;
  }

  private writeTableFromCanvasForMobile(id: string) {
    let canvas = this.canvassesForMobileTables.find(ct => ct.id === id).canvas;
    this.pptAddImageForMobile(canvas);
    this.yOffset += canvas.height + 10;
  }

  private pptAddNewSlide(){
    this.slide = this.doc.addNewSlide();
    this.yOffset = 0;
  }

  private pptAddImageForDesktop(canvas: any){
    let img = canvas.toDataURL("image/png");
    let ratio = canvas.width / canvas.height;
    this.yOffset += 0.3;
    let width = 6.5;
    let height = 6.5 / ratio;
    if (height > 7) {
        height = 7;
        width = height * ratio;
    }
    this.slide.addImage({ data: img, x: 0.25, y: this.yOffset, w: width, h: height });
  }

  private pptAddImageForMobile(canvas: any){
    let img = canvas.toDataURL("image/png");
    let ratio = canvas.width / canvas.height;
    this.yOffset += 0.1;
    let width = 3;
    let height = 3 / ratio;
    if (height > 5) {
        height = 5;
        width = height * ratio;
    }
    this.slide.addImage({ data: img, x: 0.25, y: this.yOffset, w: width, h: height });
  }

  private pptSave() {
    this.doc.save('Self-assessment-dashboard');
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

  private generateCanvassesForMobileTables() {

    this.canvassesForMobileTables = [
      { id: "criteriaTables" },
      { id: "page1Tables" },
      { id: "page2Tables" },
      { id: "page3Tables" },
    ];

    return from(new Promise<void>((resolve) => {
      this.canvassesForMobileTables.forEach(tableCanvas => {
        this.pptGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForMobileTables.every(ct => ct.canvas)) {
            resolve();
          }
        })
      });
    }));

  }

  private expandDetails() {
    let detailses = document.getElementsByTagName("details");
    let details;
    var i = -1;
    while (details = detailses[++i]) {
      details["open"] = true;
    }
  }
}
