import Form from '../../components/Form/Form';
import FormItem from '../../components/FormItem/FormItem';
import Input from '../../components/Input/Input';

import { useEffect, useRef } from 'react';

const ReactHook = () => {
  const formRef = useRef<any>(null);

  useEffect(() => {}, []);

  const submit = () => {
    if (formRef.current) {
      formRef.current.submit((formValue: any) => {
        console.log('formValue', formValue);
      });
    }
  };

  const reset = () => {
    if(formRef.current){
      formRef.current.resetValue();
    }
  };

  return (
    <>
      <Form ref={formRef}>
        <FormItem name="account" label="测试Form账号">
          <Input></Input>
        </FormItem>
      </Form>
      <button onClick={() => submit()}>提交</button>
      <button onClick={() => reset()}>重置</button>
    </>
  );
};

export default ReactHook;
