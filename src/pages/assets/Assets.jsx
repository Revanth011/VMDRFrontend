import { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import AssestsInputModel from '../../components/assets/AssetsInputModel';
import columns from '../utils/AssetsColumns';
import axios from 'axios';
import "./styles/Assets.css";

function Assets() {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const onSelectChange = (newSelectedRowKeys, selectedRows) => {
        const newArray = selectedRows.map(row => {
            const { key, ...rest } = row;
            return rest;
        })
        setSelectedRows(newArray);
    };

    const rowSelection = {
        selectedRows,
        onChange: onSelectChange,
        type: 'checkbox'
    };

    useEffect(() => {
        const resData = [];
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/assets/list`)
            .then(response => {
                console.table(response.data)
                response.data.forEach((row, i) => {
                    resData.push({
                        key: i + 1,
                        assetCode: row.assetCode,
                        assetName: row.assetName,
                        assetType: row.assetType,
                        hostName: row.hostName,
                        ipAddress: row.ipAddress,
                        primaryAssetOwner: row.primaryAssetOwner,
                        secondaryAssetOwner: row.secondaryAssetOwner,
                        creationDate: row.creationDate,
                        lastModified: row.lastModified,
                    })
                })
                setData(resData);
            })
            .catch(error => console.log(error))

    }, []);

    function exportFile() {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/assets/export`, selectedRows, { responseType: "blob" })
            .then(response => {
                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Export.xlsx`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.log(error))
    }

    return (
        <Card
            title="Assets"
            bordered={false}
            style={{
                margin: "1rem"
            }}
        >
            <AssestsInputModel exportFile={exportFile} />
            <Table
                rowSelection={rowSelection}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <div
                            style={{
                                margin: 0,
                            }}
                        >
                            <div className="" id='assetExpand'>
                                <b># </b>
                                <span>{record.key}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Asset code </b>
                                <span>{record.assetCode}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Asset name </b>
                                <span>{record.assetName}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Asset Type </b>
                                <span>{record.assetType}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Host name </b>
                                <span>{record.hostName}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>IP Address </b>
                                <span>{record.ipAddress}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Primary Asset Owner </b>
                                <span>{record.primaryAssetOwner}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Secondary Asset Owner </b>
                                <span>{record.secondaryAssetOwner}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Creation Date </b>
                                <span>{record.creationDate}</span>
                            </div>
                            <div className="" id='assetExpand'>
                                <b>Last Modified </b>
                                <span>{record.lastModified}</span>
                            </div>
                        </div>
                    ),
                }}
                dataSource={data}
                pagination={{
                    defaultCurrent: 1,
                    total: 100,
                    position: ["topRight"]
                }}
                scroll={{
                    x: 2000
                }}

            />
        </Card>
    );
}

export default Assets;
