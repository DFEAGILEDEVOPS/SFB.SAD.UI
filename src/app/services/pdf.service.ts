import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  declare html2canvas;
  MARGIN_LEFT: number;
  doc: any;
  offset: number;

  constructor() {
    this.MARGIN_LEFT = 50;
  }

  public generatePdfForDashboard() {
    this.offset = 60;
    this.doc = new jsPDF({ unit: 'px', format: 'a3' });
    this.writeHeadings();
    this.writeWarnings();
    this.writeCriteriaAndTables();
  }

  private writeHeadings() {

    this.pdfWriteLine('H1', 'Self-assessment dashboard');
    this.offset -= 20;
    if($('#dateCaption').length > 0) {
      this.pdfWriteLine('Grayed', $('#dateCaption').get(0).innerText);
    }
    this.offset += 10;
    let assessingText = $('#assessing').get(0).innerText;
    let part1 = assessingText.substring(0, assessingText.indexOf('.') + 1);
    let part2 = assessingText.substring(assessingText.indexOf('.') + 2);
    this.pdfWriteLine('Bold', part1);
    if(part2){
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

  private writeCriteriaAndTables() {
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
        debugger;
        this.offset += canvas.height;
        if(canvas.height > 130) {
          this.offset -= 40;
        }
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

  private pdfWriteLine(type, text) {
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
        this.doc.setTextColor(177,180,182);
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
    this.doc.text(this.MARGIN_LEFT + 5, this.offset, text);
    this.offset += fontSize + 8;
  }

}
