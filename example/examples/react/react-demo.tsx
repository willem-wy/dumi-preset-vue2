// @jsxImportSource react
// 👆👆👆项目中同时存在 React 和 Vue 时，Volar 可能错误地将 React 的 JSX 语法当作 Vue 的 JSX 规范来校验。
import React, { useState } from 'react';
import {
  Button,
  Card,
  Space,
  Tag,
  Badge,
  Progress,
  Switch,
  Rate,
  Slider,
  Input,
  Select,
  DatePicker,
  Alert,
  message,
  Steps,
  Timeline,
  Avatar,
  Divider,
} from 'antd';
import {
  UserOutlined,
  LikeOutlined,
  StarOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export default function ReactDemo() {
  const [count, setCount] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  const [selectValue, setSelectValue] = useState('vue');
  const [rateValue, setRateValue] = useState(4);

  const handleButtonClick = () => {
    setCount(count + 1);
    if (count >= 2) {
      message.success('🎉 太棒了！继续加油！');
    }
  };

  return (
    <div className="react-demo" style={{ padding: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题卡片 */}
        <Card title="⚛️ React + Ant Design 演示" bordered={false}>
          <p>这是 React 组件配合 Ant Design 在 Dumi 中的原生渲染</p>
          <Space>
            <Tag color="blue">React 18</Tag>
            <Tag color="cyan">Ant Design 5.x</Tag>
            <Tag color="green">Dumi</Tag>
          </Space>
        </Card>

        {/* 计数器示例 */}
        <Card title="Hooks 交互示例" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Badge count={count} showZero>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>当前计数:</span>
            </Badge>
            
            <Space>
              <Button type="primary" onClick={handleButtonClick} icon={<LikeOutlined />}>
                点击 +1
              </Button>
              <Button danger onClick={() => setCount(0)}>
                重置
              </Button>
            </Space>

            <Progress percent={Math.min(count * 10, 100)} status={count >= 10 ? 'success' : 'active'} />

            {count >= 3 && (
              <Alert
                message="Vue 2 和 React 完美共存"
                description={`你已经点击了 ${count} 次！这证明了 Vue 2 和 React 可以在同一个 Dumi 站点中无缝协作。`}
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
              />
            )}
          </Space>
        </Card>

        {/* 表单组件示例 */}
        <Card title="表单组件展示" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <span style={{ marginRight: '10px' }}>开关控制:</span>
              <Switch checked={switchChecked} onChange={setSwitchChecked} />
              <span style={{ marginLeft: '10px', color: switchChecked ? '#52c41a' : '#999' }}>
                {switchChecked ? '已开启' : '已关闭'}
              </span>
            </div>

            <div>
              <span style={{ marginRight: '10px' }}>评分:</span>
              <Rate value={rateValue} onChange={setRateValue} allowHalf />
            </div>

            <div>
              <span style={{ display: 'block', marginBottom: '10px' }}>滑块 ({sliderValue}%):</span>
              <Slider value={sliderValue} onChange={setSliderValue} />
            </div>

            <div>
              <span style={{ marginRight: '10px' }}>下拉选择:</span>
              <Select value={selectValue} onChange={setSelectValue} style={{ width: 120 }}>
                <Option value="vue">Vue 2</Option>
                <Option value="react">React</Option>
                <Option value="angular">Angular</Option>
              </Select>
            </div>

            <div>
              <span style={{ marginRight: '10px' }}>日期选择:</span>
              <DatePicker placeholder="选择日期" />
            </div>

            <TextArea rows={3} placeholder="多行文本输入..." maxLength={100} showCount />
          </Space>
        </Card>

        {/* 状态展示组件 */}
        <Card title="状态与反馈组件" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              message="信息提示"
              description="这是一个信息级别的 Alert 组件示例"
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
            />

            <Alert
              message="警告提示"
              description="注意：这是一个警告级别的消息"
              type="warning"
              closable
            />

            <Space>
              <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: '#1890ff' }} />
              <Avatar style={{ backgroundColor: '#f56a00' }}>U</Avatar>
              <Badge dot>
                <Avatar icon={<SmileOutlined />} style={{ backgroundColor: '#87d068' }} />
              </Badge>
            </Space>
          </Space>
        </Card>

        {/* 步骤和时间线 */}
        <Card title="流程展示组件" bordered={false}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Divider />

            <Timeline>
              <Timeline.Item color="green">支持 Vue 2 组件渲染</Timeline.Item>
              <Timeline.Item color="green">支持 React 组件渲染</Timeline.Item>
              <Timeline.Item color="blue">混合框架支持</Timeline.Item>
              <Timeline.Item color="red">持续优化中...</Timeline.Item>
            </Timeline>
          </Space>
        </Card>

        {/* 底部提示 */}
        <Card bordered={false} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Space direction="vertical" size="small">
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              🚀 dumi-preset-vue2 插件
            </div>
            <div>让 Vue 2 项目在 Dumi 文档系统中获得完美支持</div>
            <Space>
              <Tag color="white" style={{ color: '#764ba2' }}>TypeScript</Tag>
              <Tag color="white" style={{ color: '#764ba2' }}>Vue 2.6</Tag>
              <Tag color="white" style={{ color: '#764ba2' }}>Webpack</Tag>
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
