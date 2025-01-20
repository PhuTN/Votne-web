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
    width: 100%;
    margin: 0 auto;
    padding-bottom: 20px;
    gap: 50px;

    @media (max-width: 450px) {
      flex-direction: column;
      gap: 5px;
      padding-left: 10px;
      
      width: 90%;
    }

    @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
      gap: 10px;
      padding-left: 10px;
      
    }
  }

  .footer-column {
    flex: 1;

    color: white;

    h3 {
      color: white;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      font-family: 'Arial', sans-serif;
    }

    p, a {
      color: white;
      margin: 0;
      line-height: 1.6;
      font-size: 14px;
    }

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .highlight {
      color: #ffffff; /* Màu trắng cho chữ highlight */
      font-weight: bold;
    }

    .highlight-orange {
      color: #ff6600; /* Màu cam cho chữ cần nhấn mạnh */
      font-weight: bold;
    }

    @media (max-width: 450px) {
      min-width: 100%;
      max-width: none;
      margin-bottom: 5px;
      h3 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
      }
    }

    @media (max-width: 768px) {
      min-width: 90%;
      max-width: 95%;
      margin-bottom: 10px; 
      h3 {
        font-size: 14px; 
      }
      p {
        font-size: 12px; 
      }
    }
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    text-align: center;
    padding-top: 20px;
    font-size: 12px;
    gap: 5px;
    background-color: #1DA0F1;

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
      }
    }

    /* For screens with width <= 450px */
    @media (max-width: 450px) {
      padding-top: 10px;
      p {
        font-size: 10px;
      }
    }

    /* For screens with width between 450px and 768px */
    @media (max-width: 768px) {
      padding-top: 15px; /* Adjust padding-top for medium screens */
      p {
        font-size: 11px; /* Adjust font-size */
      }
    }
  }
`;

export { FooterContainer };
