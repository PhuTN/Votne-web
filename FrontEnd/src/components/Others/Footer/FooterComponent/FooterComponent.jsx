import React from 'react';
import { FooterContainer } from './style';

const FooterComponent = () => {
  return (
    <FooterContainer>
      <div className="footer-columns">
        <div className="footer-column">
          <h3>THÔNG TIN CHUNG</h3>
          <p>
            <strong className='color'>Vợt nè </strong>  là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp
          </p>
          <p>
            <strong className='color'>Sứ mệnh:</strong> <span  style={{fontStyle:'italic'}}>"VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình."</span>
          </p>
          <p>
            <strong className='color'>Tầm nhìn:</strong> <span style={{fontStyle:'italic'}}>"Trở thành nhà phân phối và sản xuất thể thao lớn nhất Việt Nam"</span>
          </p>
        </div>
        <div className="footer-column">
          <h3>THÔNG TIN LIÊN HỆ</h3>
          <p>
          <strong className='color'>
          Hotline: 
          </strong>
          <span > 0977508430 / 0792677415</span></p>
          <p>
          <strong className='color'>
          Email:
          </strong>
           <span > info@shopvnb.com</span></p>
          <p>
          <strong className='color'>
          Hotline bán sỉ: 
          </strong><span > 0911 105 211</span></p>
          <p>
          <strong className='color'>
          Nhượng quyền thương hiệu: 
          </strong>
          <span > 0334.741.141 (Mr. Hậu)</span></p>
        </div>
        <div className="footer-column">
          <h3>CHÍNH SÁCH</h3>
          <p>Chính sách đổi trả, hoàn tiền</p>
<p>Chính sách bảo hành</p>
<p>Chính sách xử lý khiếu nại</p>
<p>Chính sách vận chuyển</p>
<p>Điều khoản sử dụng</p>
<p>Chính sách bảo mật thông tin</p>
<p>Chính sách nhượng quyền</p>
        </div>
        <div className="footer-column">
          <h3>HƯỚNG DẪN</h3>
          <p>Tìm hiểu công việc tập huấn tennis trước khi tổ chức giải đấu</p>
<p>Bảng size Lining - Cách chọn size quần áo Lining, giày cầu lông Lining</p>
<p>Hướng dẫn cách tập tennis cho người mới chơi</p>
<p>Hướng dẫn cách chọn vợt cầu lông cho người mới chơi</p>
<p>Hướng dẫn thanh toán</p>
<p>Kiểm tra bảo hành</p>
<p>Kiểm tra đơn hàng</p>
<p>Hướng dẫn mua hàng</p>
        </div>
      </div>
      <div className="footer-bottom" style={{backgroundColor:'#1DA0F1', margin:'0'}}>
        <p>© CÔNG TY TNHH Vợt nè</p>
        <p>Địa chỉ: 390/2 Hà Huy Giáp, Phường Thạnh Lộc, Quận 12, TPHCM<br></br>
        GPKD số 0314496879 do Sở KH và ĐT TP Hồ Chí Minh cấp ngày 05/07/2017 <br></br>
        GĐ/Sở hữu website: Phan Lê Chi</p>

      </div>
    </FooterContainer>
    
  );
};

export default FooterComponent;
