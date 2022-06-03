import styled from "styled-components";

const CheckoutCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 52%;
`;

const InputField = styled.input`
  margin-top: 3%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid gray;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;

const SelectField = styled.select`
  margin-top: 3%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid gray;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  background-color: white;
`;

const InputCtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Form = () => {
  return (
    <>
      <CheckoutCtn>
        <span>Shipping Address</span>
        <InputCtn>
          <InputField
            name="lineOne"
            type="text"
            placeholder="First Name"
            required
            style={{ borderRight: "none" }}
          />
          <InputField
            name="lineOne"
            type="text"
            placeholder="Last Name"
            required
          />
        </InputCtn>
        <InputField name="lineOne" type="text" placeholder="Address" required />
        <InputCtn>
          <InputField
            style={{ borderRight: "none" }}
            name="city"
            type="text"
            placeholder="City"
            required
          />
          <InputField
            style={{ borderRight: "none" }}
            name="state"
            type="text"
            placeholder="State"
            required
          />
          <InputField
            name="zipcode"
            type="number"
            placeholder="Zipcode"
            required
          />
        </InputCtn>
      </CheckoutCtn>
      <CheckoutCtn style={{ marginTop: "5%" }}>
        <span>Billing</span>
        <InputField
          name="cardNum"
          type="number"
          placeholder="Enter Card Number"
          required
        />
        <InputCtn>
          <SelectField style={{ borderRight: "none" }} name="month" required>
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </SelectField>
          <SelectField name="year" required>
            <option value="">Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </SelectField>
        </InputCtn>
        <InputCtn>
          <InputField
            name="cvv"
            type="number"
            placeholder="CVV"
            required
            style={{ borderRight: "none" }}
          />
          <InputField name="zip" type="number" placeholder="ZipCode" required />
        </InputCtn>
      </CheckoutCtn>
    </>
  );
};

export default Form;
