import React, { useState } from 'react';
import { Button, Modal, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    action: `${process.env.REACT_APP_BACKEND_URL}/assets/upload`,

    onChange(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    beforeUpload: (file) => {
        const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === "text/csv";
        if (!isXlsx) {
            message.error(`${file.name} is not a xlsx file`);
        }
        return isXlsx || Upload.LIST_IGNORE;
    }
};

const AssestsInputModel = ({ exportFile }) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
        window.location.reload();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Assets
            </Button>
            <Button type="primary" onClick={exportFile} style={{ marginLeft: "1rem" }}>
                Export
            </Button>
            <Modal
                title="Add Assets"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Ok"
                cancelText="Cancel"
            >
                <Upload {...props} multiple={true} >
                    <Button icon={<UploadOutlined />}>Upload spreadsheet only</Button>
                </Upload>
            </Modal>
        </>
    );
};

export default AssestsInputModel;
