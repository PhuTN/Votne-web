import React from 'react';
import { Card, Col } from 'antd';
import { CategoryContainer, BrandItem, BrandList, CategoryTitle, SeeMore } from './style';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title2, brands, onTitleClick }) => {
    return (
        <Col span={4}>
            <CategoryContainer>
                <Link to={`/product/${title2}`} style={{ textDecoration: 'none' }}>
                    <CategoryTitle onClick={onTitleClick}>{title2} Cầu Lông</CategoryTitle>
                </Link>
                <BrandList>
                    {brands.slice(0, 8).map((brand, index) => (
                        <BrandItem key={index}>Vợt cầu lông {brand.value}</BrandItem>
                    ))}
                </BrandList>
                <SeeMore>Xem thêm</SeeMore>
            </CategoryContainer>
        </Col>
    );
};

export default CategoryCard;
