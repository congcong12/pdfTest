import "@/components/footerLayout/style.css";
import { Col, Row } from "antd";
import Image from "next/image";

export default function FooterLayout() {
  return (
    <div className="footer">
      <div className="footer-ad">
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Row gutter={[16, 24]} className="footer-ad-left">
              <Image width={40} height={40} src="/ji.jpg" alt="" />
              <span>
                Chat with any PDF: ask questions, get summaries, find
                information, and more.
              </span>
              <Row>
                <Col span={6}>
                  <Image width={40} height={40} src="/ji.jpg" alt="" />
                </Col>
                <Col span={6}>
                  <Image width={40} height={40} src="/ji.jpg" alt="" />
                </Col>
                <Col span={6}>
                  <Image width={40} height={40} src="/ji.jpg" alt="" />
                </Col>
                <Col span={6}>
                  <Image width={40} height={40} src="/ji.jpg" alt="" />
                </Col>
              </Row>
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={8}>
                <Row gutter={[16, 24]} className="footer-ad-js">
                  <Col span={24} className="footer-ad-js-title">
                    Products
                  </Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row gutter={[16, 24]} className="footer-ad-js">
                  <Col span={24} className="footer-ad-js-title">
                    Products
                  </Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row gutter={[16, 24]} className="footer-ad-js">
                  <Col span={24} className="footer-ad-js-title">
                    Products
                  </Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                  <Col span={24}>Use cases</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
