import { Component, ElementRef, ViewChild } from "@angular/core";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import h2c from "html2canvas";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild("content", { static: true }) content: ElementRef;
  // Arr = Array;
  num: number = 5;
  // titles:string[];
  // const elements = Array(n);
  titles = [
    "MAIN QUAY",
    "MAIN LOADING AREA",
    "SECOND LOADING AREA",
    "MAIN UNLOADING AREA",
    "MAIN TRANSPORT ROAD",
  ];

  items = [this.titles]; // Content of the pages
  counter: number;
  length: number;
  pdf: jsPDF;
  constructor() {}

  public downloadAsPDF() {
    var node = document.getElementById("content");
    var node1 = document.getElementById("footer");

    var img,img1;
    var filename,filename1;
    var newImage,newImage1;

    domtoimage
      .toPng(node, { bgcolor: "#fff" })

      .then(function (dataUrl) {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        // img1 = new Image();
        // img1.src = dataUrl;
        // newImage1 = img1.src;

        img.onload = function () {
          var pdfWidth = img.width;
          var pdfHeight = img.height * 0.26;

          var doc = new jsPDF("l", "mm");

          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();
          var pagecount = Math.ceil(pdfHeight / height) - 1;
          doc.addImage(newImage, "PNG", 2, 0, width - 4, 0);
          // doc.addPage("l", "mm", "a4");
          // // var pdfWidth = img.width;
          // var pdfHeight1 = img1.height * 0.26;

          // var doc1 = new jsPDF("l", "mm");

          // var width1 = doc1.internal.pageSize.getWidth();
          // var height1 = doc1.internal.pageSize.getHeight();
          // doc1.addImage(newImage1, "PNG", 2, 0, width1 - 4, 0);
          if (pagecount > 0) {
            // doc.addImage(newImage1, "PNG", 2, -height1, width1 - 4, 0);
            var j = 1;
            while (j != pagecount) {
              
              // doc1.addPage("l", "mm", "a4");
             
              // doc.text(5,5, doc.internal.getCurrentPageInfo().pageNumber + "/" + pagecount);
              doc.addPage("l", "mm", "a4");
              doc.addImage(newImage, "PNG", 2, -(j * height), width - 4, 0);
             
            // doc.addImage(newImage1,"PNG",2,-(j*height1),width1-4,0);
             
              j++;
            }
          }

          // doc.addImage(newImage, "PNG", 6, 0, width, height);
          filename = "getData" + ".pdf";
          doc.save(filename);
        };
      })
      .catch(function (error) {
        // Error Handling
      });
  }
  
}
