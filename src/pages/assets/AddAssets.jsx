import { Button, Form, Input, DatePicker, Select, Card } from 'antd';
import axios from "axios";

const AddAssets = () => {
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: { span: 4, },
        wrapperCol: { span: 14, },
    }

    const buttonItemLayout =
    {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    }

    const onFinish = (values) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/assets/list`, values)
            .then(resp => window.location.reload())
            .catch(error => console.log(error))
    };

    return (
        <Card
            title="Add Asset"
            bordered={false}
            style={{
                margin: "1rem"
            }}
        >
            <Form
                {...formItemLayout}
                layout={"horizontal"}
                form={form}
                initialValues={{
                    layout: "horizontal",
                }}
                onFinish={onFinish}
            >
                <Form.Item label="Asset code" name="assetCode" rules={[{ required: true, }]}>
                    <Input placeholder="Input asset code" />
                </Form.Item>
                <Form.Item label="Asset name" name="assetName" rules={[{ required: true, }]}>
                    <Input placeholder="Input asset name" />
                </Form.Item>
                <Form.Item label="Host name" name="hostName" rules={[{ required: true, }]}>
                    <Input placeholder="Input host name" />
                </Form.Item>
                <Form.Item label="IP Address" name="ipAddress" rules={[{ required: true, }]}>
                    <Input placeholder="input IP address" />
                </Form.Item>
                <Form.Item label="Asset Type" name="assetType" rules={[{ required: true, }]}>
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: 'Web',
                                label: 'Web',
                            },
                            {
                                value: 'SCR',
                                label: 'SCR',
                            },
                            {
                                value: 'Infra',
                                label: 'Infra',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Primary Asset Owner" name="primaryAssetOwner" rules={[{ required: true, }]}>
                    <Input placeholder="Input primary asset owner" />
                </Form.Item>
                <Form.Item label="Secondary Asset Owner" name="secondaryAssetOwner" rules={[{ required: true, }]}>
                    <Input placeholder="Input secondary asset owner" />
                </Form.Item>
                <Form.Item label="Creation Date" name="creationDate" rules={[{ required: true, }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">Add Asset</Button>
                </Form.Item>
            </Form>
        </Card >

    );
};

export default AddAssets;
