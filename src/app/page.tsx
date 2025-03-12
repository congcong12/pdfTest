"use client";

import "@/app/style.css";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import { Button, Tooltip, Spin } from "antd";

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
    [key: number]: number;
  }>(null);
  const [pdfWidth, setPdfWidth] = useState<number>(450);

  const [renderedPages, setRenderedPages] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageRenderSuccess = () => {
    setRenderedPages((prev) => prev + 1);
  };

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
    const initRotation = () =>
      Object.fromEntries([...Array(numPages)].map((_, i) => [i + 1, 90]));

    if (!pdfRotation) {
      setPdfRotation(initRotation());
      return;
    }

    const copyObj = deepClone(pdfRotation);

    const isAllRotated = Object.keys(copyObj).length === numPages;
    const updatedRotation = isAllRotated
      ? Object.fromEntries(
          Object.entries(copyObj).map(([key, value]) => [key, value + 90])
        )
      : {
          ...initRotation(),
          ...Object.fromEntries(
            Object.entries(copyObj).map(([key, value]) => [key, value + 90])
          ),
        };

    setPdfRotation(updatedRotation);
  };

  const removeAllPdf = () => {
    setFile(null);
    setPdfWidth(450);
    setNumPages(0);
    setPdfRotation(null);
    setIsReady(false);
    setRenderedPages(0);
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
    const originalFileName = file.name.replace(/\.pdf$/, "");
    const newFileName = `${originalFileName} (KUNai).pdf`;
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), newFileName);
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

  useEffect(() => {
    if (renderedPages === numPages && renderedPages !== 0) {
      const canvasElements = containerRef.current?.querySelectorAll("canvas");
      canvasElements?.forEach((canvas) => {
        canvas.style.width = "";
        canvas.style.height = "";
      });
      setIsReady(true);
    }
  }, [renderedPages, numPages]);

  return (
    <div className="box">
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
                  pdfWidth === 500 ? "disabled-icon" : "icon-hoverable"
                }
              />
            </Tooltip>
            <Tooltip placement="top" title={"testtesttesttest"}>
              <MinusCircleOutlined
                onClick={delAllScale}
                className={
                  pdfWidth === 100 ? "disabled-icon" : "icon-hoverable"
                }
              />
            </Tooltip>
          </div>
        )}
      </div>

      {file && (
        <div ref={containerRef}>
          {!isReady && (
            <div className="loading-container">
              <Spin size="large" tip="PDF 加载中..." />
            </div>
          )}
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
                style={{
                  display: isReady ? "block" : "none",
                  flex: `0 0 ${pdfWidth}px`,
                  maxWidth: `${pdfWidth}`,
                }}
              >
                <RedoOutlined
                  className="pdf-rotate-btn"
                  onClick={() => handlePdfIndex(index + 1)}
                />
                <h4 className="pdf-page-number">{index + 1}</h4>
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
                    onRenderSuccess={handlePageRenderSuccess}
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
        </div>
      )}
    </div>
  );
}
