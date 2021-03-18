import React from 'react';
import { Spin } from 'antd';

import styles from './Loading.scss';

const Loading = () => <Spin className={styles.loading} size="large" />;

export default Loading;
