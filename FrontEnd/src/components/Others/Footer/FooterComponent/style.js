import { Footer } from "antd/es/layout/layout";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #141414;
  color: white;

  .color {
    color: #1DA0F1;
  }

  .footer-columns {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    gap: 50px;

    @media (max-width: 768px) {
      flex-wrap: wrap; /* Cho phép các cột xuống dòng */
      justify-content: center; /* Căn giữa các cột */
      gap: 20px; /* Giảm khoảng cách giữa các cột */
    }
  }

  .footer-column {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
    color: white;

    h3 {
      color: white;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      font-family: 'Arial', sans-serif;

      @media (max-width: 768px) {
        font-size: 14px; /* Thu nhỏ tiêu đề trên tablet */
      }
    }

    p, a {
      color: white;
      margin: 0;
      line-height: 1.6;
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 12px; /* Giảm kích thước chữ trên tablet */
      }
    }

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .highlight {
      color: #ffffff;
      font-weight: bold;
    }

    .highlight-orange {
      color: #ff6600;
      font-weight: bold;
    }
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20px;
    font-size: 12px;
    gap: 5px;

    @media (max-width: 768px) {
      font-size: 10px; /* Thu nhỏ kích thước chữ dưới màn hình nhỏ */
      padding-top: 15px;
    }

    p {
      color: black;
    }

    .contact-icons {
      display: flex;
      gap: 10px;

      a {
        color: white;
        font-size: 16px;

        &:hover {
          color: #ff6600;
        }

        @media (max-width: 768px) {
          font-size: 14px; /* Giảm kích thước icon trên tablet */
        }
      }
    }
  }

  /* Responsive cho mobile */
  @media (max-width: 480px) {
    .footer-columns {
      flex-direction: column; /* Đưa tất cả các cột xuống thành một cột */
      align-items: center; /* Căn giữa cột */
    }

    .footer-column {
      min-width: 100%; /* Đặt chiều rộng tối đa cho mobile */
      text-align: center; /* Căn giữa nội dung trong cột */
    }

    .footer-bottom {
      padding-top: 10px;
    }
  }
`;

export { FooterContainer };
