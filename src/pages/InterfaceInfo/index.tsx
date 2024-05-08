import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost
} from '@/services/api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, Descriptions, Divider, Form, Input, message} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  // 定义状态和钩子函数
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  //存储结果变量
  const [invokeRes,setInvokeRes] = useState<any>();
  //调用加载状态变量，默认为fales
  const [invokeLoading,setInvokeLoading] = useState(false);
  // 使用 useParams 钩子函数获取动态路由参数
  const params = useParams();

  const loadData = async () => {
    // 检查动态路由参数是否存在
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      // 发起请求获取接口信息，接受一个包含 id 参数的对象作为参数
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      // 将获取到的接口信息设置到 data 状态中
      setData(res.data);
    } catch (error: any) {
      // 请求失败处理
      message.error('请求失败，' + error.message);
    }
    // 请求完成，设置 loading 状态为 false，表示请求结束，可以停止加载状态的显示
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  const onFinish =async (values: any) => {
    // 检查是否存在接口id
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      // 发起接口调用请求，传入一个对象作为参数，这个对象包含了id和values的属性，
      // 其中，id 是从 params 中获取的，而 values 是函数的参数
      const res =await  invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);

    }
    setInvokeLoading(false);
  };
  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ?(
        <Descriptions title="data.name" column ={ 1} >
            <Descriptions.Item label="接口状态">{data.status?'开启':'关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.reponseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
          ):(
            <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card>
      <Form name="invoke" layout="vertical" onFinish={ onFinish }>
        {/* 创建一个表单项,用于输入请求参数,表单项名称为"userRequestParams" */}
        <Form.Item label="请求参数" name="userRequestParams">
          <Input.TextArea />
        </Form.Item>
        {/* 创建一个包裹项,设置其宽度占据 16 个栅格列 */}
        <Form.Item wrapperCol={{ span: 16 }}>
          {/* 创建调用按钮*/}
          <Button type="primary" htmlType="submit">
            调用
          </Button>
        </Form.Item>
      </Form>
    </Card>
      <Divider />
      <Card
      title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
