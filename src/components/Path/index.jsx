/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';

import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './index.scss';

const { Item } = Breadcrumb;

/**
 * Path - 面包屑导航封装组件
 * @param {array} list - 导航数据源 e.g. [{ name: '首页', link: '/'}, { name: '关于'}]
 */
const Path = ({ isCollapsed, list }) => (
  <Breadcrumb className={[styles.path, isCollapsed ? 'collapsed' : ''].join(' ')} separator=">">
    {list.map(({ name, link }) => (
      <Item key={name}>{link ? <NavLink to={link}>{name}</NavLink> : name}</Item>
    ))}
  </Breadcrumb>
);

export default connect(...withStore('basic'))(Path);
