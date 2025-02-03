import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Rate, Progress, List, Avatar, Typography, Select } from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

// Dữ liệu đánh giá giả lập
// const reviewss? = [
//   {
//     id: 1,
//     customerName: 'Nguyen Huu Tung Lam',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
//     comment: 'Rất hay',
//     rating: 5,
//     date: '2022-01-20',
//   },
//   {
//     id: 2,
//     customerName: 'Nguyen Truong Giang',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
//     comment: 'Vợt thấy rất ok ngon, bổ, rẻ',
//     rating: 5,
//     date: '2022-03-15',
//   },
//   {
//     id: 3,
//     customerName: 'Quốc Bảo',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
//     comment: 'Giá hợp lý và chất lượng tốt!',
//     rating: 4,
//     date: '2023-05-10',
//   },
//   {
//     id: 4,
//     customerName: 'Nguyen Minh Anh',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
//     comment: 'Sản phẩm đẹp, nhưng thời gian giao hàng hơi lâu.',
//     rating: 3,
//     date: '2023-04-01',
//   },
//   {
//     id: 5,
//     customerName: 'Tran Van Hoang',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
//     comment: 'Tạm ổn, cần cải thiện bao bì đóng gói.',
//     rating: 2,
//     date: '2023-02-15',
//   },
//   {
//     id: 6,
//     customerName: 'Nguyen Thi Thuy',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
//     comment: 'Rất thất vọng, sản phẩm không giống hình.',
//     rating: 1,
//     date: '2023-01-30',
//   },
//   {
//     id: 7,
//     customerName: 'Phan Hoai Nam',
//     avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
//     comment: 'Giao hàng nhanh, sản phẩm tốt.',
//     rating: 5,
//     date: '2022-11-10',
//   },
// ];

// Styled Components
const ReviewContainer = styled.div`
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AverageRating = styled.div`
  text-align: center;
  margin-bottom: 20px;
  flex: 1;
  flex: 0 0 30%; 

  .rating-score {
    font-size: 50px;
    font-weight: bold;
    color: #66b3ff;
  }

  .rating-text {
    font-size: 16px;
    color: #666;
  }
`;

const RatingBreakdown = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
`;

const BreakdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .rating-stars {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #66b3ff;
  }

  .rating-bar {
    flex-grow: 1;
  }

  .rating-count {
  color: #666;
  font-size: 14px;
  white-space: nowrap; /* Ngăn văn bản xuống dòng */
}

`;

const ReviewCard = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;

  .review-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .review-comment {
    margin-top: 10px;
    font-style: italic;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .filter-item {
    margin-right: 10px;
  }
`;

const ProductReview = ({ reviewss = [] }) => {
  const [reviews, setReviews] = useState(reviewss);
  console.log("DIETE",reviewss)

  useEffect(() => {
     setReviews(reviewss)
    }, [reviewss]);
  const [selectedStar, setSelectedStar] = useState(0);
  const [sortOrder, setSortOrder] = useState('newest');
  let averageRating = 0;
  // Tính trung bình sao
  if(reviews?.length >0){
 averageRating = (reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
  }

  const handleFilter = (star) => {
    setSelectedStar(star);
    const filtered = star > 0 ? reviewss?.filter((r) => r.rating === star) : reviewss;
    setReviews(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...reviews].sort((a, b) => {
      if (order === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (order === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if(order === 'highest') {
        return b.rating - a.rating;
      }
      else{
        return a.rating - b.rating;
      }
    });
    setReviews(sorted);
  };

  return (
    <ReviewContainer>
    <Title level={3} style = {{marginBottom: '50px',marginTop:'0px'}}>Đánh giá & nhận xét</Title>
      <ReviewHeader>
        
        <AverageRating>
          <div className="rating-score">{averageRating}/5</div>
          <Rate disabled defaultValue={parseFloat(averageRating)} style={{ fontSize: '24px' }} />
          <div className="rating-text">Tổng cộng: {reviewss?.length} đánh giá</div>
        </AverageRating>
        <RatingBreakdown>
          {[5, 4, 3, 2, 1].map((star) => (
            <BreakdownItem key={star}>
              <div className="rating-stars">
                {star} <Rate disabled defaultValue={star} count={1} />
              </div>
              <Progress
                percent={Math.round(
                  (reviewss?.filter((r) => r.rating === star).length / reviewss?.length) * 100
                )}
                size="small"
                showInfo={false}
                strokeColor="#66b3ff"
              />
              <div className="rating-count">
                {reviewss?.filter((r) => r.rating === star).length} đánh giá
              </div>
            </BreakdownItem>
          ))}
        </RatingBreakdown>
      </ReviewHeader>
      <FilterContainer>
        <Select
          className="filter-item"
          defaultValue={0}
          onChange={handleFilter}
          style={{ width: 150 }}
        >
          <Option value={0}>Tất cả sao</Option>
          {[5, 4, 3, 2, 1].map((star) => (
            <Option key={star} value={star}>
              {star} sao
            </Option>
          ))}
        </Select>
        <Select
          className="filter-item"
          defaultValue="newest"
          onChange={handleSort}
          style={{ width: 150 }}
        >
          <Option value="newest">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
          <Option value="highest">Đánh giá cao đến thấp</Option>
          <Option value="lowest">Đánh giá thấp đến cao</Option>
        </Select>
      </FilterContainer>
      <List
        dataSource={reviews}
        renderItem={(review) => (
          <ReviewCard>
            <div className="review-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar src={review.avatar} alt={review.customerName} />
                <strong>{review.customerName}</strong>
              </div>
              <small style={{ color: 'gray' }}>{moment(review.date).format('DD/MM/YYYY')}</small>
            </div>
            <Rate disabled value={review.rating} style={{ fontSize: '16px' }} />
            <div className="review-comment">{review.comment}</div>
          </ReviewCard>
        )}
      />
    </ReviewContainer>
  );
};

export default ProductReview;
