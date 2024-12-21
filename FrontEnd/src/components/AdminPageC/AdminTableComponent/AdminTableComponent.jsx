import React from 'react';
import { DataLayout } from './style';
import { Col, Input, Row, Select, Table } from 'antd';

const AdminTableComponent = ({
    title,
    selectContent,
    onChange,
    options,
    defaultValue,
    columns,
    onRowSelect,
    data
}) => {
    const onSearch = () => {
        // Implement search functionality here
    };

    return (
        <DataLayout>
            <Row style={{ marginBottom: '50px' }}>
                <h2>{title}</h2>
            </Row>

            <Row style={{ marginTop: '10px' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    onRow={onRowSelect ? (record) => ({
                        onClick: () => onRowSelect(record), // Gọi hàm onRowSelect khi hàng được chọn
                    }) : undefined} // Chỉ định onRow nếu onRowSelect có sẵn
                    style={{ width: '100%', border: '0.1px solid #70d3f4', borderRadius: '9px', padding: '2px' }}
                    pagination={{
                        pageSize: 15,
                        showSizeChanger: false,
                        showQuickJumper: true,
                    }}
                />
            </Row>
        </DataLayout>
    );
};

export default AdminTableComponent;
