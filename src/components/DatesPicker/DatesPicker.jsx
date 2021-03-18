/* eslint-disable */
import React, { Component } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

/**
 * Form 表单用 月份选择器，为解决antd提供的MonthRangePicker无法在点击选择完成之后关闭的问题
 */
class DatesPicker extends Component {
  state = {
    mode: ['date', 'date'],
    isopen: false,
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.setState({ isopen: false });
  };
  onOpenChange = (status) => {
    if (status) {
      this.setState({ isopen: true });
    } else {
      this.setState({ isopen: false });
    }
  };

  render() {
    const { value, ...rest } = this.props;
    const { mode, isopen } = this.state;
    return (
      <RangePicker
        open={isopen}
        format="YYYY-MM-DD"
        placeholder={['开始日期', '结束日期']}
        onOpenChange={this.onOpenChange}
        mode={mode}
        {...rest}
        value={value}
        onChange={this.handleChange}
        onPanelChange={this.handleChange}
      />
    );
  }
}

export default DatesPicker;
