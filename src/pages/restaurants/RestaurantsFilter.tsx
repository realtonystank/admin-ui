import { Button, Card, Col, Input, Row } from "antd";

import { ReactNode } from "react";

type RestaurantsFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: ReactNode;
};

const RestaurantsFilter = ({
  onFilterChange,
  children,
}: RestaurantsFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={14}>
          <Input.Search
            placeholder="Search"
            allowClear={true}
            onChange={(e) => onFilterChange("RestaurantFilter", e.target.value)}
          />
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};

export default RestaurantsFilter;
