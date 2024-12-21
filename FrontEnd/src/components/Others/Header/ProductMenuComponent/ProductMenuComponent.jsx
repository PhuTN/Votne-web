import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByBrand } from '../../../../redux/Slicer/attributeSlice';

const ProductMenuComponent = () => {
    const dispatch = useDispatch();
    const { attributes2 } = useSelector((state) => state.attributes);
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    useEffect(() => {
        dispatch(fetchAttributesByBrand());
    }, [dispatch]);

    const handleTitleClick = () => {
        // Ẩn menu và đặt timeout để kích hoạt lại sau 0.5 giây
        setIsMenuVisible(false);
        setTimeout(() => {
            setIsMenuVisible(true);
        }, 500);
    };

    if (!attributes2) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row
                gutter={[0, 0]}
                style={{ margin: '20px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}
            >
                {isMenuVisible &&
                    attributes2.map((category, index) => (
                        <CategoryCard
                            key={index}
                            title2={category.type}
                            brands={category.values}
                            onTitleClick={handleTitleClick} // Truyền hàm sự kiện
                        />
                    ))}
            </Row>
        </div>
    );
};

export default ProductMenuComponent;
