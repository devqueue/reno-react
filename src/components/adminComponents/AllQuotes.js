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
import {getAllQuotes , approveMerchantQuote } from '../../api/AdminApi'
import moment from 'moment'



const MainPage = () => {
    const [ allData , setData ] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false)

    // approving merchant request for quote
    const changeStatus = async (id) => {
        let isFound = allData.find(item => item.Id === id);
        if(isFound){
            if(isFound.isMerchantApproved === false){
                isFound.isMerchantApproved = true
                isFound.quoteStatus = "Quote Sent to Customer"
                const {data} = await approveMerchantQuote(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Quote Approved and Sent to Customer Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }
        }
    }

    const TABLE_HEADERS = [
        {
            prop: "createdAt",
            title: "Received Date",
        },
        {
            prop: "totalAmt",
            title: "Total Amount"
        },
        {
            prop: "per_month",
            title: "Per Month"
        },
        {
            prop: "total_Months",
            title: "Total Months",
        },
        {
            prop: "IdCard",
            title: "Customer ID "
        },
        {
            prop: "phoneNo",
            title: "Contact No."
        },
        {
            prop : "_id",
            title: "Change Status",
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
            const {data} = await getAllQuotes();
            let allDataArr = [];
            if(data?.success === true){
                for(let i = 0; i !== data?.AllQuotes.length; i++){
                    let newArr = {
                        createdAt: moment(data?.AllQuotes[i]?.createdAt).format('MMM Do YY, h:mm'),
                        totalAmt: data?.AllQuotes[i]?.financeDetails?.totalPurchaseAmt,
                        per_month: data?.AllQuotes[i]?.financeDetails?.depositAmt,
                        total_Months: data?.AllQuotes[i]?.RepaymentAmount?.totalMonths,
                        IdCard: data?.AllQuotes[i]?.customerAndProductDetails?.IDCardNo,
                        phoneNo: data?.AllQuotes[i]?.customerAndProductDetails?.phoneNo,
                        quoteStatus: data?.AllQuotes[i]?.quoteStatus,
                        isMerchantApproved: data?.AllQuotes[i]?.isAdminMerchantApproved,
                        Id: data?.AllQuotes[i]?._id,
                    }
                    allDataArr.push(newArr)
                }
                setData(allDataArr)
            }else{
                toast.error("Some Error Occurred while fetching Records");
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
                                        <h4>All Quotes</h4>
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
