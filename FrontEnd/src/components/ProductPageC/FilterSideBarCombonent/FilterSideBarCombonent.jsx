import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Checkbox, Collapse, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { toggleCheckbox } from "../../../redux/Slicer/checkboxSlice"; // Import action từ slice

const { Panel } = Collapse;

const SidebarContainer = styled.div`
  width: 280px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 15px;
`;

const ScrollableSection = styled.div`
  max-height: 150px;
  overflow-y: auto;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const CustomPanel = styled(Panel)`
  .ant-collapse-header {
    background-color: #e6f7ff;
    color: #1890ff;
    padding: 10px;
    font-weight: 500;
    border-radius: 4px;
  }
`;

const FilterSideBarComponent = ({ filters, typeNe }) => {
  const dispatch = useDispatch();
  const checkboxState = useSelector((state) => state.checkbox); // Trạng thái từ Redux
  const [searchText, setSearchText] = useState(
    filters.reduce((acc, filter) => {
      acc[filter.name] = "";
      return acc;
    }, {})
  );

  const handleSearchChange = (filterName, e) => {
    setSearchText((prevState) => ({
      ...prevState,
      [filterName]: e.target.value,
    }));
  };

  const handleCheckboxChange = (type, id) => {
    dispatch(toggleCheckbox({ type, id }));
  };

  const defaultKeys = filters.map((filter, index) => index);

  return (
    <SidebarContainer>
      <Collapse activeKey={defaultKeys}>
        {filters.map((filter, index) => (
          <CustomPanel header={filter.name} key={index}>
            {filter.values.length > 15 && (
              <Input
                value={searchText[filter.name]}
                onChange={(e) => handleSearchChange(filter.name, e)}
                style={{ marginBottom: "10px" }}
                prefix={<SearchOutlined />}
              />
            )}
            <ScrollableSection>
              {filter.values
                .filter((value) =>
                  value.value
                    .toLowerCase()
                    .includes((searchText[filter.name] || "").toLowerCase())
                )
                .map((value) => (
                  <CheckboxWrapper key={value.id}>
                    <Checkbox
                      checked={
                        checkboxState[typeNe]?.includes(value._id) || false
                        
                      }
                      onChange={() =>
                        handleCheckboxChange(typeNe, value._id)
                      }
                    >
                      {value.value}
                    </Checkbox>
                  </CheckboxWrapper>
                ))}
            </ScrollableSection>
          </CustomPanel>
        ))}
      </Collapse>
    </SidebarContainer>
  );
};



export default FilterSideBarComponent;
