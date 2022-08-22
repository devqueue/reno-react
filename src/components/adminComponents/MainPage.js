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
import {getAllMerchants , disApproveAnyMerchant, ApproveAnyMerchant} from '../../api/AdminApi'



const MainPage = () => {
    const [ allData , setData ] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false)

    const changeStatus = async (id) => {
        let isFound = allData.find(item => item.Id === id);
        if(isFound){
            if(isFound.status == "Pending"){
                isFound.status = "Approved"
                const {data} = await ApproveAnyMerchant(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Merchant Approved Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }else{
                isFound.status = "Pending"
                const {data} = await disApproveAnyMerchant(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Merchant DisApproved Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }
        }
    }

    const TABLE_HEADERS = [
        {
            prop: "firstName",
            title: "FirstName",
            isFilterable: true
        },
        {
            prop: "lastName",
            title: "LastName"
        },
        {
            prop: "email",
            title: "Email"
        },
        {
            prop: "companyEmail",
            title: "Company Email",
        },
        {
            prop: "category",
            title: "Category"
        },
        {
            prop: "country",
            title: "Country"
        },
        // {
        //     prop: "city",
        //     title: "City"
        // },
        {
            prop : "_id",
            title: "Change Status",
            name: "Actions",
            cell: (prop) => {
                return (
                    prop?.status === "Pending" ? (
                        <Button size="sm" variant="primary" onClick={() => changeStatus(prop?.Id)} >{prop?.status}</Button>
                    ) : (
                        <Button size="sm" variant="success" onClick={() => changeStatus(prop?.Id)} >{prop?.status}</Button>
                    )
                )
                },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


    useEffect(() => {
        const getAllRecords = async () => {
            setIsFetching(true)
            const {data} = await getAllMerchants();
            let allDataArr = [];
            if(data?.success === true){
                for(let i = 0; i !== data?.AllMerchants.length; i++){
                    let newArr = {
                        firstName: data?.AllMerchants[i]?.firstName,
                        lastName: data?.AllMerchants[i]?.lastName,
                        email: data?.AllMerchants[i]?.email,
                        companyEmail: data?.AllMerchants[i]?.companyEmail ? data?.AllMerchants[i]?.companyEmail : 'N/A',
                        category: data?.AllMerchants[i]?.category,
                        country: data?.AllMerchants[i]?.country,
                        //city: data?.AllMerchants[i]?.city,
                        status: data?.AllMerchants[i]?.status,
                        Id: data?.AllMerchants[i]?._id,
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
                                        <h4>All Merchants</h4>
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
