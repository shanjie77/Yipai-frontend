import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from '@/pages/Admin/InterfaceInfo/components/UpdateForm';
import UpdateForm from '@/pages/Admin/InterfaceInfo/components/UpdateForm';
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost
} from "@/services/api-backend/interfaceInfoController";
import type {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";





const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {

      await addInterfaceInfoUsingPost({ ...fields });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      return true;
    } catch (error:any) {
      hide();
      message.error('创建失败，'+error.message);
      return false;
    }
  };
  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: FormValueType) => {
    if(!currentRow)
    {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPost({
        id:currentRow.id,
        ...fields,
      });
      hide();

      message.success('操作成功');
      return true;
    } catch (error:any) {
      hide();
      message.error('操作失败，'+error.message);
      return false;
    }
  };
  /** 发布接口
  *
  * @param record
  */
  const handleOnline = async (record: API.IdRequest) => {
    // 显示正在发布的加载提示
    const hide = message.loading('发布中');
    // 如果接口数据为空，直接返回true
    if (!record) return true;
    try {
      // 调用发布接口的POST请求方法
      await onlineInterfaceInfoUsingPost({
        // 传递接口的id参数
        id: record.id,
      });
      hide();
      // 显示操作成功的提示信息
      message.success('操作成功');
      // 重新加载数据
      actionRef.current?.reload();
      // 返回true表示发布成功
      return true;
    } catch (error: any) {
      hide();
      // 显示操作失败的错误提示信息
      message.error('操作失败，' + error.message);
      // 返回false表示发布失败
      return false;
    }
  };
  /**
   * 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    // 显示正在下线的加载提示
    const hide = message.loading('发布中');
    // 如果接口数据为空，直接返回true
    if (!record) return true;
    try {
      // 调用下线接口的POST请求方法
      await offlineInterfaceInfoUsingPost({
        // 传递接口的id参数
        id: record.id,
      });
      hide();
      // 显示操作成功的提示信息
      message.success('操作成功');
      // 重新加载数据
      actionRef.current?.reload();
      // 返回true表示下线成功
      return true;
    } catch (error: any) {
      hide();
      // 显示操作失败的错误提示信息
      message.error('操作失败，' + error.message);
      // 返回false表示下线失败
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPost({
       id:record.id
      });
      hide();
      message.success('删除成功');
      return true;
    } catch (error:any) {
      hide();
      message.error('删除失败，'+error.message);
      return false;
    }
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const   columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType:'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType:'text',
      formItemProps:{
        required:true,
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType:'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType:'text',
      formItemProps:{
        required:true,
      }
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType:'text',
      formItemProps:{
        required:true,
      }
    },
    {
      title : '请求参数',
      dataIndex : 'requestParams',
      valueType:'jsonCode',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType:'jsonCode',
      formItemProps:{
        required:true,
      }
    },
    {
      title: '响应头',
      dataIndex: 'reponseHeader',
      valueType:'jsonCode',
      formItemProps:{
        required:true,
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm:true,
      valueEnum:{
        0:{
          text:'关闭',
          status:'Default'
        },
        1:{
          text:'开启',
          status:'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType:'dateTime',
      hideInForm:true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType:'dateTime',
      hideInForm:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
        修改
        </a>,
        record.status === 0 ?
        <a
          key="online"
          onClick={() => {
            handleOnline(record);
          }}
        >
          发布
        </a>:null,
        record.status === 1 ?
        <Button
          type="text"
          danger
          key="offline"
          onClick={() => {
            handleOffline(record);
          }}
        >
         下线
        </Button>:null,
        <Button
          type="text"
          danger
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
          </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={async (params: U & {
          pageSize?: number;
          current?: number;
          keyword?: string;
        }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>)=>
        {
          const res:any = await listInterfaceInfoByPageUsingGet({
            ...params
          })
          if(res?.data)
          {
            return {
              data:res?.data.records|| [],
              success:true,
              total : res?.data.total || 0,
            };
          }
          else
          {
            return {
              data:[],
              success:false,
              total :   0,
          };
        }}
        }
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

      <CreateModal columns={columns}
                   onCancel={()=>{handleModalOpen(false);}}
                   onSubmit={values =>  {handleAdd(values);
                   }
                   }
                   visible={createModalOpen}
                   />
    </PageContainer>
  );
};

export default TableList;
