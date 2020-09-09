import { element } from 'protractor';
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
  canvassesForTables: any[];

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdfForDesktop() {
    this.expandDetails();
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadings();
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
      });
    }, 100);
  }

  public generatePdfForMobile() {
    this.expandDetails();
    $("#downloadPage").text(" Loading...");
    $("body").css("cursor", "wait");
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadings();
    this.writeWarnings();
    setTimeout(() => {
      this.generateCanvassesForMobileTables().subscribe(() => {

        this.writeTableFromCanvasForMobile("criteriaTable");
        if ($('#scenarioName').length > 0) {
          this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText, true);
        }
        if ($('#scenarioYear').length > 0) {
          this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText, true);
        }

        if ($("#scenariosTable").length > 0) {
          this.writeTableFromCanvasForMobile("scenariosTable");
        }

        this.pdfWriteLine('H3', 'Reserve and balance', true);
        this.writeTableFromCanvasForMobile("reserveTable-0");
        this.writeTableFromCanvasForMobile("reserveTable-1");

        this.pdfAddNewPage();
        this.pdfWriteLine('H3', 'Spending', true);
        this.writeTableFromCanvasForMobile("spendingTable-0");
        this.writeTableFromCanvasForMobile("spendingTable-1");
        this.writeTableFromCanvasForMobile("spendingTable-2");
        this.writeTableFromCanvasForMobile("spendingTable-3");
        this.writeTableFromCanvasForMobile("spendingTable-4");
        this.writeTableFromCanvasForMobile("spendingTable-5");
        this.writeTableFromCanvasForMobile("spendingTable-6");
        this.writeTableFromCanvasForMobile("spendingTable-7");

        this.pdfAddNewPage();
        this.pdfWriteLine('H3', 'School characteristics', true);
        this.writeTableFromCanvasForMobile("charTable-0");
        this.writeTableFromCanvasForMobile("charTable-1");
        this.writeTableFromCanvasForMobile("charTable-2");
        this.writeTableFromCanvasForMobile("charTable-3");
        this.writeTableFromCanvasForMobile("charTable-4");
        this.writeTableFromCanvasForMobile("charTable-5");
        this.writeTableFromCanvasForMobile("charTable-6");

        this.pdfAddNewPage();
        this.pdfWriteLine('H3', 'Outcomes', true);
        this.writeTableFromCanvasForMobile("ofstedTable");
        if ($("#progress8Table").length > 0) {
          this.writeTableFromCanvasForMobile("progress8Table");
        }
        if ($("#ks2Table").length > 0) {
          this.writeTableFromCanvasForMobile("ks2Table");
        }

        this.pdfSave("Self-assessment-dashboard.pdf");
        $("#downloadPage").text(" Download page");
        $("body").css("cursor", "");
      });
    }, 100);
  }

  private writeTableFromCanvasForMobile(id: string) {
    let canvas = this.canvassesForTables.find(ct => ct.id === id).canvas;
    let ratio = canvas.width / canvas.height;
    let width = 210;
    let height = 210 / ratio;
    if (this.offset + height > 900) {
      this.pdfAddNewPage();
    }
    this.pdfAddImage(canvas, width, height);
    this.offset += height + 50;
  }

  private writeTableFromCanvasForDesktop(id: string) {
    let canvas = this.canvassesForTables.find(ct => ct.id === id).canvas;
    if (this.offset + canvas.height > 900) {
      this.pdfAddNewPage();
    }
    this.pdfAddImage(canvas, null, null);
    this.offset += canvas.height + 50;
  }

  private writeHeadings() {
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
    this.offset = 70;
  }

  private pdfGenerateImage(elementId) {
    let element = $(elementId)[0];
    console.log(element.clientWidth + ","  + element.clientHeight);
    return html2canvas(element, {
      imageTimeout: 0,
      removeContainer: true,
      logging: true,
      width: element.clientWidth,
      height: element.clientHeight

    });
  }


  private pdfAddImage(canvas, width, height) {
    let img = canvas.toDataURL("image/png");
    this.doc.addImage(img, 'PNG', this.MARGIN_LEFT, this.offset, width, height, "", 'FAST');
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
    this.canvassesForTables = [
      { id: "criteriaTable" },
      { id: "reserveTable-0" },
      { id: "reserveTable-1" },
      { id: "spendingTable-0" },
      { id: "spendingTable-1" },
      { id: "spendingTable-2" },
      { id: "spendingTable-3" },
      { id: "spendingTable-4" },
      { id: "spendingTable-5" },
      { id: "spendingTable-6" },
      { id: "spendingTable-7" },
      { id: "charTable-0" },
      { id: "charTable-1" },
      { id: "charTable-2" },
      { id: "charTable-3" },
      { id: "charTable-4" },
      { id: "charTable-5" },
      { id: "charTable-6" },
      { id: "ofstedTable" }
    ]

    if($("#progress8Table").length > 0){
      this.canvassesForTables.push({ id: "progress8Table" });
    }

    if($("#ks2Table").length > 0){
      this.canvassesForTables.push({ id: "ks2Table" });
    }

    if($("#scenariosTable").length > 0){
      this.canvassesForTables.push({ id: "scenariosTable" });
    }

    return from(new Promise((resolve) => {
      this.canvassesForTables.forEach(tableCanvas => {
        this.pdfGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForTables.every(ct => ct.canvas)) {
            resolve();
          }
        })
      });
    }));

  }

  private generateCanvassesForDesktopTables() {
    this.canvassesForTables = [
      { id: "criteriaTable" },
      { id: "reserveTable" },
      { id: "spendingTable" },
      { id: "charTable" },
      { id: "outcomesTable" }
    ]

    return from(new Promise((resolve) => {
      this.canvassesForTables.forEach(tableCanvas => {
        this.pdfGenerateImage('#' + tableCanvas.id).then((canvas) => {
          tableCanvas.canvas = canvas;
          if (this.canvassesForTables.every(ct => ct.canvas)) {
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
