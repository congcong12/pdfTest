"use client";

import "@/app/style.css";
import Image from "next/image";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";

import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).href;
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";

export default function Home() {
  const [file, setFile] = useState<null | File>(null);
  const [numPages, setNumPages] = useState<number>(0); // 总页数
  const [pdfRotation, setPdfRotation] = useState<null | {
    [key: string]: number;
  }>(null);
  const [pdfWidth, setPdfWidth] = useState<number>(550);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFile(file);
    }
  };

  const deepClone = <T,>(obj: T): T => {
    return structuredClone(obj);
  };

  const rotateAllPdf = () => {
    if (!pdfRotation) {
      const initObj: { [key: number]: number } = {};
      for (let i = 0; i < numPages; i++) {
        initObj[i + 1] = 90;
      }
      setPdfRotation(initObj);
    } else {
      const copyObj = deepClone(pdfRotation);

      for (let key in copyObj) {
        copyObj[key] = copyObj[key] + 90;
      }
      setPdfRotation(copyObj);
    }
  };

  const removeAllPdf = () => {
    setFile(null);
    setPdfWidth(550);
    setNumPages(0);
    setPdfRotation(null);
  };
  const addAllScale = () => {
    setPdfWidth(pdfWidth + 50);
  };
  const delAllScale = () => {
    setPdfWidth(pdfWidth - 50);
  };
  const download = async () => {
    if (!file) {
      alert("请先上传 PDF");
      return;
    }

    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.getPages().forEach((page, index) => {
      const rotation = pdfRotation?.[index + 1] || 0;
      if (rotation !== 0) {
        page.setRotation(degrees(rotation));
      }
    });

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "rotated.pdf");
  };
  const handlePdfIndex = (index: number) => {
    if (!pdfRotation) {
      const initObj: { [key: number]: number } = {};
      initObj[index] = 90;
      setPdfRotation(initObj);
    } else {
      if (!pdfRotation[index]) {
        const newObj = deepClone(pdfRotation);
        newObj[index] = 90;
        setPdfRotation(newObj);
      } else {
        const newObj = deepClone(pdfRotation);
        newObj[index] = newObj[index] + 90;
        setPdfRotation(newObj);
      }
    }
  };
  return (
    <div>
      <div className="setPdf-title">
        <h1>Rotate PDF Pages</h1>
        <p>
          Simply click on a page to rotate it. You can then download your
          modified PDF.
        </p>
      </div>
      <div className="pdf-contain">
        {!file ? (
          <div onDrop={handleDrop} className="pdf-upload">
            <div className="pdf-upload-box">
              <Image width={40} height={40} src="/ji.jpg" alt="" />
              <p>Click to upload or drag and drop</p>
              <input type="file" accept=".pdf" onChange={handleFileChange} />
            </div>
          </div>
        ) : (
          <div className="pdf-action">
            <Button onClick={rotateAllPdf} type="primary">
              Rotate
            </Button>
            <Tooltip placement="top" title={"testtesttesttest"}>
              <Button onClick={removeAllPdf} type="primary" danger>
                Remove PDF
              </Button>
            </Tooltip>
            <Tooltip placement="top" title={"testtesttesttest"}>
              <PlusCircleOutlined
                onClick={addAllScale}
                className={
                  pdfWidth === 600 ? "disabled-icon" : "icon-hoverable"
                }
              />
            </Tooltip>
            <Tooltip placement="top" title={"testtesttesttest"}>
              <MinusCircleOutlined
                onClick={delAllScale}
                className={
                  pdfWidth === 300 ? "disabled-icon" : "icon-hoverable"
                }
              />
            </Tooltip>
          </div>
        )}
      </div>

      {file && (
        <>
          <Document
            file={file} // 直接传递 File 对象
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            className="pdf-yulan-box"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                className="pdf-contant"
                key={`pdf-page-${index}`}
                style={{ width: pdfWidth + "px" }}
              >
                <RedoOutlined
                  className="pdf-rotate-btn"
                  onClick={() => handlePdfIndex(index + 1)}
                />
                <div
                  className="page-wrapper"
                  style={{
                    transform: `rotate(${
                      !pdfRotation
                        ? 0
                        : !pdfRotation[index + 1]
                        ? 0
                        : pdfRotation[index + 1]
                    }deg)`,
                  }}
                >
                  <Page
                    key={`page-${index}`}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    pageNumber={index + 1}
                    className={`pdf-page`}
                    width={pdfWidth - 50}
                  />
                </div>
              </div>
            ))}
          </Document>
          <Tooltip placement="top" title={"testtest"}>
            <Button className="pdf-download" onClick={download} type="primary">
              Download
            </Button>
          </Tooltip>
        </>
      )}
    </div>
  );
}
