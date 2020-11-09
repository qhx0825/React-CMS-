import React, { useEffect, useState } from 'react'
import { QfCateSelect } from '@/components'

import {
  Table,
  Tag,
  Space,
  Row,
  Col,
  DatePicker,
  Button,
  Modal
} from 'antd'

import { getGoodListAction, getClearInfoAction } from '@/store/actions'
import { useSelector, useDispatch } from 'react-redux'

import img from '@/utils/img'
import './style.scss'
import { fetchGoodDel } from '@/utils/api'

import moment from 'moment'

const { RangePicker } = DatePicker


export default function GoodList(props) {

  const good = useSelector(store=>store.good.good)
  const cateArr = useSelector(store=>store.good.cateList)
	console.log(cateArr)
  const [visible, setVisible] = useState(false)
  const [curRow, setCurRow] = useState({})

  const [filter, setFilter] = useState({
    dates: [],
    cate: '',
    page: 1,
    size: 2
  })

  // 页面初始化、调接口
  const dispatch = useDispatch()
  useEffect(()=>{
    // 触发
    dispatch(getGoodListAction(filter))
    return undefined
  }, [filter])

  const skipToDetail = () => {
    // 清空redux中的商品详情
    dispatch(getClearInfoAction())
    props.history.push('/good/detail/0')
  }

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      fixed: true,
      render: (name, row) => {
        return (
          <div className='good-img'>
            <img src={img.imgBaseUrl+row.img} alt={name} />
            <div>{name}</div>
          </div>
        )
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 150,
      key: 'desc',
      align: 'center'
      // render: age => <span>{age*100}</span>
    },
    {
      title: '品类',
      dataIndex: 'cate',
      key: 'cate',
      align: 'center',
      render: cate=>{
		  console.log(cate)
		  cateArr.map(ele=>console.log(ele))
        // let arr = cateArr.map(ele=>ele.cate===cate)
        // return <span>{arr[0].cate_zh}</span>
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: price => <span>{'￥'+price}</span>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: hot=><span>{hot?'是':'否'}</span>
    },
    {
      title: '上线时间',
      key: 'create_time',
      dataIndex: 'create_time',
      align: 'center',
      render: time => {
        let m = moment(time)
        return(
          <>
            <div>{m.format('YYYY年MM月DD日')}</div>
            <div>{m.format('HH时mm分ss秒')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      key: '_id',
      render: (text, row) => (
        <Space size="middle">
          <span
            className='qf-table-edit'
            onClick={()=>props.history.push('/good/detail/'+row._id)}
          >
            编辑
          </span>
          <span
            className='qf-table-del'
            onClick={()=>deleteHandle(row)}
          >
            删除
          </span>
        </Space>
      ),
    },
  ]



  // 日期筛选【moment】的使用
  // let sTime = dates[0].format('YYYY-MM-DD HH:mm:ss')
  // let eTime = dates[1].valueOf()

  const filterChange = (key, e) => {
    switch (key) {
      case 'dates':
        e = e || []
        break
      case 'cate':
        e = e || ''
        break
      default:
    }
    filter[key] = e
    // 当表格上方的筛选条件发生变化时，一定要把page重置成1
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
  }

  // modal
  const deleteHandle = row => {
    setVisible(true)
    setCurRow(row)
  }
  const modalHandle = type => {
    if(type==='ok') {
      // 调接口删除商品
      fetchGoodDel({id: curRow._id}).then(()=>{
        dispatch(getGoodListAction(filter))
        setVisible(false)
      })
    }else{
      setVisible(false)
    }
  }

  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div style={{padding:'20px 0'}}>
        <Row align='middle'>
          <Col span={2}>
            <span className='qf-key'>时间:</span>
          </Col>
          <Col span={7}>
            <RangePicker
              onChange={(e)=>filterChange('dates', e)}
            />
          </Col>
          <Col span={2}>
            <span className='qf-key'>品类:</span>
          </Col>
          <Col span={4}>
            <QfCateSelect
              value={filter.cate}
              onChange={(e)=>filterChange('cate', e)}
              hasAll
            />
          </Col>
          <Col offset={7} span={2}>
            <div className='qf-key' style={{paddingRight: '0'}}>
              <Button type='primary' onClick={skipToDetail}>新增</Button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Table
          columns={columns}
          rowKey='_id'
          dataSource={good.list}
          pagination={{
            pageSize: 2,
            current: filter.page,
            onChange: e=>filterChange('page', e),
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [1,2,3,5,10],
            showTotal: ()=>{
              return <h1>总共 {good.total} 条</h1>
            },
            total: good.total
          }}
        />
      </div>

      <Modal
          title="警告"
          visible={visible}
          onOk={()=>modalHandle('ok')}
          onCancel={()=>modalHandle('no')}
        >
          <div>你确定要删除 <span style={{color: 'red'}}>{curRow.name}</span> 这个宝贵的商品吗？</div>
      </Modal>
    </div>
  )
}
