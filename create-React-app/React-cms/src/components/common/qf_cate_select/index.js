import React, {useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getCatesActions } from '@/store/actions'

import { Select } from 'antd'
const { Option } = Select

export default (props) => {

  const cateList = useSelector(store=>store.good.cateList)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCatesActions({}))
    return undefined
  }, [])

  return (
    <div className='qf-cate-select'>
      <Select
        value={props.value||''}
        allowClear
        style={{width:'100px'}}
        onChange={val=>props.onChange(val)}
      >
        { props.hasAll && <Option value=''>全部</Option> }
        {
          cateList.map(ele=>(
            <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
          ))
        }
      </Select>
    </div>
  )
}
