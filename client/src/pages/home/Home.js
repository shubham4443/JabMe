import "./home.css";
import { useState, useEffect } from "react";
import { getDistricts, getStates } from "../../services";
import { incrementPendingRequests, decrementPendingRequests, notify } from "../../utils";
import { Tabs, Form, Input, Button, Select, Collapse, Checkbox, Radio } from 'antd';
import ConditionalFormBlock from "../../components/conditional-form-block/ConditionalFormBlock";
const { TabPane } = Tabs;
const { Panel } = Collapse;

function Home({ onSearch }) {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [method, setMethod] = useState("pincode");
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      incrementPendingRequests();
      try {
        const data = await getStates();
        setStates(data.states);
      } catch (err) {
        notify("error", "Error", "There is some error in fetching states. Please try again later.");
      }
      finally {
        decrementPendingRequests();
      }
    }
    fetchData();
  }, [])

  const handleSearch = () => {
    if (method === "pincode") {
      form.validateFields(["pincode", "age", "cost", "vaccine"]).then(values => {
        values["method"] = "pincode";
        onSearch(values);
      })
    }
    else {
      form.validateFields(["state", "district", "age", "cost", "vaccine"]).then(values => {
        values["method"] = "district";
        delete values.state;
        onSearch(values);
      })
    }
  }

  const handleChangeState = async (state_id) => {
    try {
      const data = await getDistricts(state_id);
      setDistricts(data.districts);
      form.resetFields(["district"])
    }
    catch (err) {
      notify("error", "Error", "There is some error in fetching districts. Please try again later.")
    }
  }

  const resetFilters = () => {
    form.resetFields(["age", "cost", "vaccine"])
  }
  
  return (
    <div className="home_content">
      <h2 style={{ textAlign: "center" }}>Place a trigger for vaccine availability</h2>
      <div className="search_box">
        <Form
          form={form}
          layout="vertical"
        >
          <Tabs type="card" onChange={val => setMethod(val)}>
            <TabPane tab="Search by PIN" key="pincode">
              <Form.Item name="pincode" rules={[{ required: true, message: "Please enter pincode" }]}>
                <Input placeholder="Enter your PIN" />
              </Form.Item>
            </TabPane>
            <TabPane tab="Search by District" key="district">
              <Form.Item name="state" rules={[{ required: true, message: "Please select state" }]}>
                <Select placeholder="Select state" onChange={handleChangeState}>
                  {states.map(val => <Select.Option value={val.state_id} key={val.state_id}>{val.state_name}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item name="district" rules={[{ required: true, message: "Please select district" }]}>
                <Select placeholder="Select district">
                  {districts.map(val => <Select.Option value={val.district_id} key={val.district_id}>{val.district_name}</Select.Option>)}
                </Select>
              </Form.Item>
            </TabPane>
          </Tabs>
          <Form.Item name="applyFilters" valuePropName="checked">
            <Checkbox onChange={resetFilters}>Apply Filters</Checkbox>
          </Form.Item>
          <ConditionalFormBlock shouldUpdate={true} condition={() => form.getFieldValue("applyFilters")}>
            <Form.Item name="age" label="Age">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="18+">18 & Above</Radio.Button>
                <Radio.Button value="18-45">18-45 Only</Radio.Button>
                <Radio.Button value="45+">45 & Above</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="cost" label="Cost">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Paid">Paid</Radio.Button>
                <Radio.Button value="Free">Free</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="vaccine" label="Vaccine">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="COVISHIELD">Covishield</Radio.Button>
                <Radio.Button value="COVAXIN">Covaxin</Radio.Button>
                <Radio.Button value="sputnik">Sputnik V</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </ConditionalFormBlock>
          <Form.Item style={{ textAlign: "center", margin: 0 }}>
            <Button type="primary" onClick={handleSearch}>Search</Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 20 }}>
          <h3>FAQs</h3>
          <Collapse accordion>
            <Panel header="How this site works?" key="1">
              <p>Just enter either your pincode or state and district and this site will give you instant notification whenever it detects an availability.
                Note that to receive notification you have to keep the site open.</p>
            </Panel>
            <Panel header="How will I receive the notification?" key="2">
              <p>This site will make a bell like sound whenever an availability is detected. We suggest you to also keep cowin site open in order to immediately book the slot.</p>
            </Panel>
            <Panel header="Is my personal data collected?" key="3">
              <p>No we do not collect any personal data from the user. This site remains 100% transparent. Any queries contact the developer on github.</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Home;
