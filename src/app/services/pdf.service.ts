import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import * as $ from 'jquery';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  declare html2canvas;
  MARGIN_LEFT: number;
  doc: any;
  offset: number;
  canvassesForTables: any[];

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdfForDesktopDashboard() {

    $("#downloadPage").text(" Loading...");
    this.expandDetails();
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadings();
    this.writeWarnings();
    let criteriaText = $('#criteriaText').get(0).innerText;
    this.pdfWriteLine('Normal', criteriaText);
    this.generateCanvassesForDesktopDashboardTables().subscribe(() => {

      this.writeTableFromCanvasForDesktop("criteriaTable");
      this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText);
      this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText);

      this.writeTableFromCanvasForDesktop("reserveTable");
      this.offset -= 30;
      this.writeTableFromCanvasForDesktop("spendingTable");
      this.pdfAddNewPage();
      this.writeTableFromCanvasForDesktop("charTable");
      this.offset -= 150;
      this.writeTableFromCanvasForDesktop("outcomesTable");

      this.pdfSave("Self-assessment-dashboard.pdf");
      $("#downloadPage").text(" Download page");
    });
  }

  public generatePdfForMobileDashboard() {
    $("#downloadPage").text(" Loading...");
    this.expandDetails();
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3', orientation: 'portrait' });
    this.writeHeadings();
    this.writeWarnings();
    let criteriaText = $('#criteriaText').get(0).innerText;
    this.pdfWriteLine('Normal', criteriaText, true);
    this.generateCanvassesForMobileDashboardTables().subscribe(() => {

      this.writeTableFromCanvasForMobile("criteriaTable");
      this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText, true);
      this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText, true);

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
      if($("#progress8Table").length > 0){
        this.writeTableFromCanvasForMobile("progress8Table");
      }
      if($("#ks2Table").length > 0){
        this.writeTableFromCanvasForMobile("ks2Table");
      }

      this.pdfSave("Self-assessment-dashboard.pdf");
      $("#downloadPage").text(" Download page");
    });
  }

  public generatePdfForSideBySide() {
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3' });
    this.writeHeadings();
    this.writeSideBySideCriteriaAndTables();
  }

  private writeTableFromCanvasForMobile(id: string) {
    let canvas = this.canvassesForTables.find(ct => ct.id === id).canvas;
    let ratio = canvas.width / canvas.height;
    let width = 200;
    let height = 200 / ratio;
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

  private writeDashboardCriteriaAndTablesForDesktop() {
    $("#downloadPage").text(" Loading...");
    let criteriaText = $('#criteriaText').get(0).innerText;
    this.pdfWriteLine('Normal', criteriaText);
    this.expandDetails();
    this.writeTable("criteriaTable")
      .then(() => {
        this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText);
        this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText);

        this.writeTable("reserveTable")
          .then(() => {
            this.offset -= 30;
            this.writeTable("spendingTable")
              .then(() => {
                this.pdfAddNewPage();
                this.writeTable("charTable")
                  .then(() => {
                    this.offset -= 150;
                    this.writeTable("outcomesTable")
                      .then(() => {
                        this.pdfSave("Self-assessment-dashboard.pdf");
                        $("#downloadPage").text(" Download page");
                      })
                  })
              })
          })
      });
  }

  private writeDashboardCriteriaAndTablesForMobile() {
    $("#downloadPage").text(" Loading...");
    let criteriaText = $('#criteriaText').get(0).innerText;
    this.pdfWriteLine('Normal', criteriaText);
    this.expandDetails();
    this.writeTableForMobile("criteriaTable")
      .then(() => {
        this.pdfWriteLine('H3', $('#scenarioName').get(0).innerText);
        this.pdfWriteLine('Grayed', $('#scenarioYear').get(0).innerText);
        this.pdfWriteLine('Bold', 'Reserve and balance');
        this.writeTableForMobile("reserveTable-0")
          .then(() => {
            this.pdfWriteLine('Bold', 'Spending');
            this.writeTableForMobile("spendingTable-0")
              .then(() => {
                this.pdfWriteLine('Bold', 'School characteristics');
                this.writeTableForMobile("charTable-0")
                  .then(() => {
                    this.pdfWriteLine('Bold', 'Outcomes');
                    this.writeTableForMobile("ofstedTable")
                      .then(() => {
                        this.writeTableForMobile("progress8Table")
                          .then(() => {
                            this.pdfSave("Self-assessment-dashboard.pdf");
                            $("#downloadPage").text(" Download page");
                          })
                      })
                  })
              })
          })
      });
  }

  private writeSideBySideCriteriaAndTables() {
    $("#downloadPage").text(" Loading...");
    let criteriaText = $('#criteriaText').get(0).innerText;
    this.pdfWriteLine('Normal', criteriaText);
    this.expandDetails();
    this.writeTable("criteriaTable")
      .then(() => {
        this.writeTable("reserveTable")
          .then(() => {
            this.pdfAddNewPage();
            this.writeTable("spendingTable")
              .then(() => {
                this.pdfAddNewPage();
                this.writeTable("charTable")
                  .then(() => {
                    this.offset -= 150;
                    this.writeTable("outcomesTable")
                      .then(() => {
                        this.pdfSave("Self-assessment-dashboard.pdf");
                        $("#downloadPage").text(" Download page");
                      })
                  })
              })
          })
      });
  }

  private writeTable(tableId: string) {
    return new Promise((resolve, reject) => {
      this.pdfGenerateImage('#' + tableId).then((canvas) => {
        if (canvas.height > 1060) {
          this.pdfAddNewPage();
          this.offset = 0;
          let ratio = canvas.width / canvas.height;
          let height = 880;
          let width = 880 * ratio;
          if (width > 550) {
            width = 550;
            height = width / ratio;
          }
          this.pdfAddImage(canvas, width, height);
        } else {
          this.pdfAddImage(canvas, null, null);
        }
        this.offset += canvas.height;
        if (canvas.height > 130) {
          this.offset -= 40;
        }
        resolve();
      });

    });
  }

  private writeTableForMobile(tableClass: string) {
    return new Promise((resolve) => {
      this.pdfGenerateImage('#' + tableClass).then((canvas) => {
        let ratio = canvas.width / canvas.height;
        let width = 200;
        let height = 200 / ratio;
        if (this.offset + height > 900) {
          this.pdfAddNewPage();
        }
        this.pdfAddImage(canvas, width, height);
        this.offset += height + 50;
        resolve();
      });

    });
  }

  private pdfAddNewPage() {
    this.doc.addPage('a3', 'portrait');
    this.offset = 70;
  }

  private pdfGenerateImage(element) {
    function getCanvas(element) {
      return html2canvas($(element)[0], {
        imageTimeout: 2000,
        removeContainer: true
      });
    }

    return getCanvas(element);
  }


  private pdfAddImage(canvas, width, height) {
    let img = canvas.toDataURL("image/png");
    if (width && height) {
      this.doc.addImage(img, 'JPEG', this.MARGIN_LEFT, this.offset, width, height);
    } else {
      this.doc.addImage(img, 'JPEG', this.MARGIN_LEFT, this.offset);
    }
  }

  private expandDetails() {
    let detailses = document.getElementsByTagName("details");
    let details;
    var i = -1;
    while (details = detailses[++i]) {
      details["open"] = true;
    }
  }

  private pdfSave(pdfName: string) {
    this.doc.save(pdfName);
  }

  private pdfWriteLine(type: string, text: string, isMobile?: boolean) {
    this.doc.setFont("helvetica");
    this.doc.setTextColor(0, 0, 0);
    let fontSize;
    switch (type) {
      case 'H1':
        this.offset += 4;
        this.doc.setFontType("bold");
        fontSize = 40;
        break;
      case 'H2':
        this.offset += 3;
        this.doc.setFontType("bold");
        fontSize = 30;
        break;
      case 'H3':
        this.offset += 2;
        this.doc.setFontType("bold");
        fontSize = 20;
        break;
      case 'Warning':
        this.doc.setFontType("italic");
        this.doc.setTextColor(244, 119, 56);
        fontSize = 12;
        break;
      case 'Grayed':
        this.doc.setTextColor(177, 180, 182);
        fontSize = 14;
        break;
      case 'Info':
        this.doc.setFontType("italic");
        fontSize = 14;
        break;
      case 'Bold':
        this.doc.setFontType("bold");
        fontSize = 14;
        break;
      default:
        this.doc.setFontType("normal");
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

  private generateCanvassesForMobileDashboardTables() {
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

  private generateCanvassesForDesktopDashboardTables() {
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

}
