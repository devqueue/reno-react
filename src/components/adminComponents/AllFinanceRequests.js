import "bootstrap/dist/css/bootstrap.css";
import React , {useState , useEffect} from "react";
import { Col, Row, Table , Button } from "react-bootstrap";
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
} from "react-bs-datatable";
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import {getRecentFinancialRequests , approveAnyFinancialRequest } from '../../api/AdminApi'



const MainPage = () => {
    const [ allData , setData ] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false)

    // approving merchant request for quote
    const changeStatus = async (id) => {
        let isFound = allData.find(item => item.Id === id);
        if(isFound){
            if(isFound.Status === false){
                isFound.status = true
                isFound.quoteStatus = "Quote Approved By Reno"
                const {data} = await approveAnyFinancialRequest(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Quote Approved By Reno and Notification Sent to Partner for Delivery Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }
        }
    }

    const TABLE_HEADERS = [
        {
            prop: "isOwned",
            title: "Home",
        },
        {
            prop: "homeType",
            title: "Home Type"
        },
        {
            prop: "address",
            title: "Address"
        },
        {
            prop: "homeSize",
            title: "Home Area",
        },
        {
            prop: "martialStatus",
            title: "Martial Status "
        },
        {
            prop: "isWorking",
            title: "Employment"
        },
        {
            prop : "_id",
            title: "Approve Request",
            name: "Actions",
            cell: (prop) => {
                return (
                    prop?.status == false ? (
                        <Button size="sm" variant="primary" onClick={() => changeStatus(prop?.Id)} >{prop?.quoteStatus}</Button>
                    ) : (
                        <Button size="sm" variant="success" onClick={() => changeStatus(prop?.Id)} >{prop?.quoteStatus}</Button>
                    )
                )
                },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    // getting all records
    useEffect(() => {
        const getAllRecords = async () => {
            setIsFetching(true)
            const {data} = await getRecentFinancialRequests();
            let allDataArr = [];
            if(data?.success === true){
                for(let i = 0; i !== data?.AllQuotes.length; i++){
                    let newArr = {
                        isOwned: data?.AllQuotes[i]?.personalInfo?.isOwned === true ? "Owner" : "Rented",
                        homeType: data?.AllQuotes[i]?.personalInfo?.homeType,
                        address: data?.AllQuotes[i]?.personalInfo?.homeLocation,
                        homeSize: data?.AllQuotes[i]?.personalInfo?.homeSize,
                        martialStatus: data?.AllQuotes[i]?.personalInfo?.martialStatus,
                        isWorking: data?.AllQuotes[i]?.personalInfo?.workingStatus === "true" ? "Employed" : "UnEmployed",
                        quoteStatus: data?.AllQuotes[i]?.quoteStatus,
                        Status: data?.AllQuotes[i]?.Status,
                        Id: data?.AllQuotes[i]?._id,
                    }
                    allDataArr.push(newArr)
                }
                setData(allDataArr)
            }
            setIsFetching(false)
        }
        getAllRecords();
    },[])

    return (
        <>
            {
                isFetching === true ? (
                    <div style={{display : 'flex' , justifyContent: 'center' , margin: 'auto'}}>
                        <ThreeDots
                            height = "60"
                            width = "60"
                            radius = "9"
                            color = 'green'
                            ariaLabel = 'three-dots-loading'
                            wrapperStyle
                            wrapperClass
                        />
                    </div>
                ) : (
                    <Row style={{width : '80%'}} className="d-flex flex-col justify-content-center align-items-center border-top border-bottom">
                        <Col
                            xs={24}
                            xl={24}
                            lg={24}
                            className="p-4"
                        >
                            <DatatableWrapper
                                body={allData}
                                headers={TABLE_HEADERS}
                                paginationOptionsProps={{
                                    initialState: {
                                        rowsPerPage: 5,
                                        options: [5, 10, 15, 20]
                                    }
                                }}
                                >
                                <Row className="mb-4 p-2">
                                    <Col
                                        xs={12}
                                        lg={4}
                                        className="d-flex flex-col justify-content-start align-items-start"
                                    >
                                        <h4>All Financial Requests</h4>
                                    </Col>
                                    <Col
                                        xs={12}
                                        sm={6}
                                        lg={4}
                                        className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                                    >
                                    </Col>
                                    <Col
                                        xs={12}
                                        sm={6}
                                        lg={4}
                                        className="d-flex flex-col justify-content-end align-items-end"
                                    >
                                        <Filter />
                                    </Col>
                                </Row>
                                <Table>
                                    <TableHeader />
                                    <TableBody />
                                </Table>
                                <Row className="mb-4 p-2">
                                    <Col
                                        xs={12}
                                        sm={6}
                                        lg={6}
                                        className="d-flex flex-col justify-content-lg-start align-items-start justify-content-sm-start mb-2 mb-sm-0"
                                    >
                                        <PaginationOptions />
                                    </Col>
                                    <Col
                                        xs={12}
                                        sm={6}
                                        lg={6}
                                        className="d-flex flex-col justify-content-end align-items-end"
                                    >
                                        <Pagination />
                                    </Col>
                                </Row>
                            </DatatableWrapper>
                        </Col>
                    </Row>
                )
            }
        </>
    );
}

export default MainPage;
