import React, {useEffect, useMemo, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { useTable } from 'react-table'

export default function Table(props) {
    const [colors, setColors] = useState([{"id":1,"name":"cerulean","year":2000,"color":"#98B2D1","pantone_value":"15-4020"}])
    const [state, setState] = useState({
        page : 1,
        viewWidth: window.innerWidth,
        viewHeight: window.innerHeight,
    })
    const [loading, setLoading] = useState(false);

    const updateState = async (newStateParams)=>{
        setState( (prevState) => {
            console.log('current state',{
                ...prevState,
                ...newStateParams
            })
            return {
                ...prevState,
                ...newStateParams
            }
        })
    }
    let columns = useMemo(
        () => [
            {
            Header: 'Name',
            columns: [
                {
                Header: 'First Name',
                accessor: 'name',
                },
            ],
            },
            {
            Header: 'Info',
            columns: [
                {
                Header: 'Year',
                accessor: 'year',
                },
                {
                Header: 'Color',
                accessor: 'color',
                },
                {
                Header: 'Pantone Value',
                accessor: 'pantone_value',
                },
            ],
            },
        ],
        []
    )
    
    const data = useMemo(() => colors, [colors] )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        updateState({
            viewWidth : width,
            viewHeight :height
        })
    }
    const fetchData = async (pageNo, pageSize)=>{
        console.log('loading true')
        setLoading(true);
        let url = `https://reqres.in/api/colors?page=${pageNo}&per_page=${pageSize}`;
        let response = await fetch(url);
        let { page, per_page, total, total_pages, data } = await response.json();        
        console.log(`page: ${page}, per_page: ${per_page}, total: ${total}, total_pages: ${total_pages}, data: ${JSON.stringify(data)} `);
        console.log('loading false')
        setLoading(false); 
        return { page, per_page, total, total_pages, data }
    }
    
    // page change useEffect()
    useEffect( () => {
        window.addEventListener('resize', getWindowDimensions);
        const loader = async (pageNo, pageSize)=>{
            let { total, total_pages, data } = await fetchData(pageNo, pageSize);
            setColors(data)
            
            await updateState({
                totalProducts : total,
                totalPages : total_pages
            })
        }
        loader(state.page, props.pageSize);    
      return () => {
        window.removeEventListener('resize', getWindowDimensions);
      }
    },[state.page])

    // pagesize useEffect()
    useEffect( () => {
        const loader = async (pageNo, pageSize)=>{
            let {  total, total_pages, data } = await fetchData(pageNo, pageSize);
            setColors(data)
            
            await updateState({
                page: 1,
                totalProducts : total,
                totalPages : total_pages
            })
        }
        loader(state.page, props.pageSize); 
      return () => {
      }
    },[props.pageSize])

    
    const handleNextClick = async ()=>{
        updateState({ 
            page : state.page + 1
        });
    }

    const handlePrevClick = async ()=>{
        updateState({ 
            page : state.page - 1
        });
    }
    
    return (
        <div className='container mt-4'>
            { !loading && 
                <div>
                    <h3 className='mb-2'>Colors Table</h3>
                    <table className='table table-dark table-hover' {...getTableProps()} >
                        <thead>
                            {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr 
                                    {...row.getRowProps()}
                                >
                                {row.cells.map(cell => {
                                    return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                    <div className='container d-flex justify-content-end mb-2'>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Page Size
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                { props.pageSizeList.map((element) => {
                                    return <li key={element}><a className="dropdown-item" href="/" onClick={props.switchPageSize} >{element}</a></li>
                                })
                                }
                                
                            </ul>
                        </div>
                        <button disabled={state.page <= 1 } type="button" className="btn btn-dark ms-2" onClick={handlePrevClick}>&larr; {state.viewWidth > 576 ? 'Previous': ''}</button>
                        <button disabled={state.page + 1 > state.totalPages} type="button" className="btn btn-dark ms-2" onClick={handleNextClick}>{state.viewWidth > 576 ? 'Next': ''} &rarr;</button>
                    </div>
                </div>
            }
                
            <div className='d-flex justify-content-center align-items-center'  style={{ minHeight: loading ?  "80vh" : "" } } >
                { loading && <Spinner animation="border" /> }
            </div>
        </div>
    )
}
