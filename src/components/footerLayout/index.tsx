import "@/components/footerLayout/style.css";
import { Col, Row } from "antd";
import Image from "next/image";

export default function FooterLayout() {
  return (
    <div className="footer">
      <div className="footer-ad">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8} style={{ marginBottom: 24 }}>
            <Row gutter={[16, 24]} className="footer-ad-left">
              <Image width={40} height={40} src="/ji.jpg" alt="" />
              <span>
                Chat with any PDF: ask questions, get summaries, find
                information, and more.
              </span>
              <Row className="image-row">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="image-container">
                    <Image width={40} height={40} src="/ji.jpg" alt="" />
                  </div>
                ))}
              </Row>
            </Row>
          </Col>
          <Col xs={24} lg={16} style={{ marginBottom: 24 }}>
            <Row>
              {[...Array(3)].map((_, colIndex) => (
                <Col key={colIndex} xs={24} sm={8}>
                  <Row gutter={[16, 24]} className="footer-ad-js">
                    <Col span={24} className="footer-ad-js-title">
                      Products
                    </Col>
                    {[...Array(8)].map((_, rowIndex) => (
                      <Col key={rowIndex} span={24}>
                        Use cases
                      </Col>
                    ))}
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
