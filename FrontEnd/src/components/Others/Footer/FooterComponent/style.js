import { Footer } from "antd/es/layout/layout";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #141414;
  color: white;
 

  .color{
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
  }
`;

export { FooterContainer };
