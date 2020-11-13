import { Injectable } from '@angular/core';
import html2canvas from "html2canvas";
import * as $ from 'jquery';
import { from } from 'rxjs';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  MARGIN_LEFT: number;
  doc: any;
  offset: number;
  canvassesForDesktopTables: any[];
  canvassesForMobileTables: any[];

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdfForDesktop() {
    this.expandDetails();
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    $(".rating-help-icon").hide();
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadingsForDesktop();
    this.writeWarnings();
    setTimeout(() => {
      this.generateCanvassesForDesktopTables().subscribe(() => {
        this.writeTableFromCanvasForDesktop("criteriaTable");
        if ($('#scenarioName').length > 0) {
          this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText);
        }
        if ($('#scenarioYear').length > 0) {
          this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText);
        }

        this.writeTableFromCanvasForDesktop("reserveTable");
        this.offset -= 30;
        this.writeTableFromCanvasForDesktop("spendingTable");
        this.pdfAddNewPage();
        this.writeTableFromCanvasForDesktop("charTable");
        this.offset -= 150;
        this.writeTableFromCanvasForDesktop("outcomesTable");

        this.pdfSave("Self-assessment-dashboard.pdf");
        $("#downloadPage").text(" Download page");
        $("body").css("cursor", "");
        $(".rating-help-icon").show();
      });
    }, 100);
  }

  public generatePdfForMobile() {
    this.expandDetails();
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadingsForMobile();
    this.writeWarnings();
    setTimeout(() => {
      this.generateCanvassesForMobileTables().subscribe(() => {

        this.writeTableFromCanvasForMobile("criteriaTables");
        this.writeTableFromCanvasForMobile("page1Tables");
        this.pdfAddNewPage();
        this.writeTableFromCanvasForMobile("page2Tables");
        this.pdfAddNewPage();
        this.writeTableFromCanvasForMobile("page3Tables");

        this.pdfSave("Self-assessment-dashboard.pdf");
        $("#downloadPage").text(" Download page");
        $("body").css("cursor", "");
      });
    }, 100);
  }

  private writeTableFromCanvasForMobile(id: string) {
    let canvas = this.canvassesForMobileTables.find(ct => ct.id === id).canvas;
    let ratio = canvas.width / canvas.height;
    let width = 155;
    let height = 155 / ratio;
    if (this.offset + height > 900) {
      this.pdfAddNewPage();
    }
    this.pdfAddImage(canvas, width, height);
    this.offset += height + 25;
  }

  private writeTableFromCanvasForDesktop(id: string) {
    let canvas = this.canvassesForDesktopTables.find(ct => ct.id === id).canvas;
    if (this.offset + canvas.height > 900) {
      this.pdfAddNewPage();
    }
    this.pdfAddImage(canvas, null, null);
    this.offset += canvas.height + 50;
  }

  private writeHeadingsForDesktop() {
    this.pdfWriteLine('H1', $('#h1').get(0).innerText);
    this.offset -= 20;
    if ($('#dateCaption').length > 0) {
      this.pdfWriteLine('Grayed', $('#dateCaption').get(0).innerText);
    }
    this.offset += 10;
    let assessingText = $('#assessing').get(0).innerText;
    let part1 = assessingText.substring(0, assessingText.indexOf('.') + 1);
    let part2 = assessingText.substring(assessingText.indexOf('.') + 2);
    this.pdfWriteLine('Bold', part1);
    if (part2) {
      this.pdfWriteLine('Bold', part2);
    }
  }

  private writeHeadingsForMobile() {
    this.pdfWriteLine('H2', $('#h1').get(0).innerText);
    this.offset -= 20;
    if ($('#dateCaption').length > 0) {
      this.pdfWriteLine('Grayed', $('#dateCaption').get(0).innerText);
    }
    this.offset += 10;
    let assessingText = $('#assessing').get(0).innerText;
    let part1 = assessingText.substring(0, assessingText.indexOf('.') + 1);
    let part2 = assessingText.substring(assessingText.indexOf('.') + 2);
    this.pdfWriteLine('Bold', part1);
    if (part2) {
      this.pdfWriteLine('Bold', part2);
    }
  }

  private writeWarnings() {
    if ($('#partialWarning').length > 0) {
      let warningText = $('#partialWarning__text').get(0).innerText;
      let part1 = warningText.substring(0, warningText.indexOf('.') + 1);
      let part2 = warningText.substring(warningText.indexOf('.') + 2);
      this.pdfWriteLine('Warning', part1);
      this.pdfWriteLine('Warning', part2);
    }
  }


  private pdfAddNewPage() {
    this.doc.addPage('a3', 'portrait');
    this.offset = 30;
  }

  private pdfGenerateImage(elementId) {
    let element = $(elementId)[0];
    return html2canvas(element, {
      imageTimeout: 20000,
      removeContainer: false,
      width: element.clientWidth,
      height: element.clientHeight,
      allowTaint:true,
      scale: 1
    });
  }


  private pdfAddImage(canvas, width, height) {
    let img = canvas.toDataURL("image/png");
    this.doc.addImage(img, 'JPEG', this.MARGIN_LEFT, this.offset, width, height, "", 'FAST');
  }

  private pdfSave(pdfName: string) {
    this.doc.save(pdfName);
  }

  private pdfWriteLine(type: string, text: string, isMobile?: boolean) {
    this.doc.setTextColor(0, 0, 0);
    let fontSize;
    switch (type) {
      case 'H1':
        this.offset += 4;
        this.doc.setFont("helvetica", "bold");
        fontSize = 40;
        break;
      case 'H2':
        this.offset += 3;
        this.doc.setFont("helvetica", "bold");
        fontSize = 30;
        break;
      case 'H3':
        this.offset += 2;
        this.doc.setFont("helvetica", "bold");
        fontSize = 20;
        break;
      case 'Warning':
        this.doc.setFont("helvetica", "italic");
        this.doc.setTextColor(244, 119, 56);
        fontSize = 12;
        break;
      case 'Grayed':
        this.doc.setTextColor(177, 180, 182);
        fontSize = 14;
        break;
      case 'Info':
        this.doc.setFont("helvetica", "italic");
        fontSize = 14;
        break;
      case 'Bold':
        this.doc.setFont("helvetica", "bold");
        fontSize = 14;
        break;
      case 'SmallBold':
        this.doc.setFont("helvetica", "bold");
        fontSize = 8;
        break;
      default:
        this.doc.setFont("helvetica");
        fontSize = 12;
        this.offset += 2;
    }

    this.doc.setFontSize(fontSize);
    if (isMobile) {
      this.doc.text(this.MARGIN_LEFT, this.offset, text);
    }else{
      this.doc.text(this.MARGIN_LEFT + 5, this.offset, text);
    }
    this.offset += fontSize + 8;
  }

  private generateCanvassesForMobileTables() {

    this.canvassesForMobileTables = [
      { id: "criteriaTables" },
      { id: "page1Tables" },
      { id: "page2Tables" },
      { id: "page3Tables" },
    ];

    return from(new Promise((resolve) => {
      this.canvassesForMobileTables.forEach(tableCanvas => {
        this.pdfGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForMobileTables.every(ct => ct.canvas)) {
            resolve();
          }
        })
      });
    }));

  }

  private generateCanvassesForDesktopTables() {
    this.canvassesForDesktopTables = [
      { id: "criteriaTable" },
      { id: "reserveTable" },
      { id: "spendingTable" },
      { id: "charTable" },
      { id: "outcomesTable" }
    ]

    return from(new Promise((resolve) => {
      this.canvassesForDesktopTables.forEach(tableCanvas => {
        this.pdfGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForDesktopTables.every(ct => ct.canvas)) {
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
