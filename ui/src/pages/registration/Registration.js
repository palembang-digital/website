import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { useContext, useReducer, useState } from "react";
import Firebase, { withAuthorized } from "../../providers/firebase/FirebaseContext";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Space,
  List,
  Typography,
  Skeleton,
} from "antd";

const { Title } = Typography;

const Registration = () => {
  const {
    authUser,
    userInfo,
    AccessToken,
    isUserInfoLoading,
    setUserInfo
  } = useContext(Firebase);
  userInfo && navigate('/');

  const [registration, setRegistration] = useState({
    email: authUser.email || undefined,
    information_source: []
  });

  const registrationValid = (registration) => {
    return registration.email
      && (registration.term ?
        registration.name

        && registration.residence
        && (registration.residence === 'Other'
          ? registration.residence_other
          : true)

        && (registration.job === 0 ?
          registration.job_profession
          : true)

        && (registration.job === 1 ?
          registration.school_name
          && registration.school_major
          && registration.school_semester
          && typeof registration.school_semester === 'number'
          : true)

        && (registration.job === 2 ?
          registration.find_job_profession
          : true)

        && registration.whatsapp_number
        && registration.telegram_number
        && registration.motivation

        && registration.information_source.length > 0
        && (registration.information_source.indexOf('Other') > -1
          ? registration.information_source_other
          : true)
        : true);
  };

  const { run: registerUser } = useRequest(
    (registration) => ({
      url: "/api/v1/users",
      method: "post",
      headers: {
        'Authorization': `Bearer ${AccessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: registration.email,
        term: registration.term,
        name: registration.name,
        job: registration.job,
        residence: registration.residence === 'Other' ? registration.residence_other : registration.residence,
        job_profession: registration.job_profession,
        school_name: registration.school_name,
        school_major: registration.school_major,
        school_semester: registration.school_semester,
        find_job_profession: registration.find_job_profession,
        whatsapp_number: registration.whatsapp_number,
        telegram_number: registration.telegram_number,
        motivation: registration.motivation,
        information_source: registration.information_source.indexOf('Other') > -1
          ? registration.information_source
            .map(source => source === 'Other' ? registration.information_source_other : source)
          : registration.information_source,
      }),
    }),
    {
      manual: true,
      onSuccess: (data) => {
        data.uid && navigate("/");
        setUserInfo(data);
      },
      onError: (error) => {
        Modal.error({ content: error.message });
      },
    }
  );

  const [form] = Form.useForm();

  const privacyTerm = (<>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
      initialValue={registration.email}
    >
      <Input
        onChange={(e) => setRegistration({ ...registration, email: e.target.value })}
      />
    </Form.Item>

    <div>
      <p>Kebijakan Privasi</p>
      <p>
        <small>
          Adanya Kebijakan Privasi ini adalah komitmen dari Palembang Digital untuk menghargai dan melindungi setiap data atau informasi pribadi Anggota Resmi Palembang Digital.
          Dengan mengisi formulir registrasi keanggotaan Palembang Digital, Anggota menyatakan bahwa setiap data Anggota merupakan data yang benar dan sah, serta Anggota Resmi memberikan persetujuan kepada Palembang Digital untuk memperoleh, mengumpulkan, menyimpan, mengelola dan mempergunakan data tersebut untuk keperluan komunikasi, penyediaan informasi, dan layanan terkait kegiatan komunitas Palembang Digital.
          Apabila Anggota Resmi berkeberatan, maka Kami menyarankan untuk tidak melanjutkan pengisian formulir registrasi.
          Terima kasih.
        </small>
      </p>
    </div>

    <Form.Item
      label="Apakah Anda menyetujui Kebijakan Privasi Palembang Digital?"
      name="term"
      colon={false}
      rules={[
        { required: true, message: "Please choose" },
      ]}
    >
      <Radio.Group buttonStyle='solid' size='large' onChange={(e) =>
        setRegistration({ ...registration, term: e.target.value })
      }>
        <Space direction="vertical">
          <Radio value={true}>Ya, saya menyetujui kebijakan privasi komunitas Palembang Digital</Radio>
          <Radio value={false}>Tidak</Radio>
        </Space>
      </Radio.Group>
    </Form.Item>
  </>);

  const personalInformation = (<>
    <Form.Item
      label="Nama Lengkap"
      name="name"
      rules={[
        { required: true, message: "Please input your name!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, name: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Domisili Saat ini"
      name="residence"
      colon={false}
      rules={[
        { required: true, message: "Please choose" },
      ]}
    >
      <Radio.Group buttonStyle='solid' size='large' onChange={(e) => {
        form.validateFields(['residenceOther']);
        setRegistration({ ...registration, residence: e.target.value });
      }}>
        <Space direction="vertical">
          <Radio value='Palembang'>Palembang</Radio>
          <Radio value='Other'>
            Yang lain:
            <Form.Item
              name="residenceOther"
              rules={[
                { required: registration.residence === 'Other', message: "Please input your residence!" },
              ]}
            >
              <Input
                disabled={registration.residence !== 'Other'}
                onChange={(e) =>
                  setRegistration({ ...registration, residence_other: e.target.value })
                }
              />
            </Form.Item>
          </Radio>
        </Space>
      </Radio.Group>
    </Form.Item>

    <Form.Item
      label="Apakah Anda sudah bekerja?"
      name="job"
      colon={false}
      rules={[
        { required: true, message: "Please choose" },
      ]}
    >
      <Radio.Group buttonStyle='solid' size='large' onChange={(e) =>
        setRegistration({ ...registration, job: e.target.value })
      }>
        <Space direction="vertical">
          <Radio value={0}>Ya, Saya sudah bekerja</Radio>
          <Radio value={1}>Tidak, Saya masih Mahasiswa / Pelajar</Radio>
          <Radio value={2}>Tidak, tapi Saya sedang mencari Pekerjaan</Radio>
        </Space>
      </Radio.Group>
    </Form.Item>
  </>);

  const jobInformation = (<>
    <Form.Item
      label="Apakah profesi Anda Sekarang? "
      name="jobProfession"
      rules={[
        { required: true, message: "Please input your profession!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, job_profession: e.target.value })
        }
      />
    </Form.Item>
  </>);

  const studentInformation = (<>
    <Form.Item
      label="Nama Kampus / Sekolah Terakhir"
      name="schoolName"
      rules={[
        { required: true, message: "Please input your institution name!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, school_name: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Jurusan Kuliah / Sekolah"
      name="schoolMajor"
      rules={[
        { required: true, message: "Please input your major!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, school_major: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Kelas / Semester Anda sekarang"
      name="schoolSemester"
      rules={[
        { required: true, type: 'number', message: "Please input your semester / class!" },
      ]}
    >
      <InputNumber
        onChange={(value) =>
          setRegistration({ ...registration, school_semester: value })
        }
      />
    </Form.Item>
  </>);

  const findJobInformation = (<>
    <Form.Item
      label="Profesi apa yang Anda inginkan? "
      name="findJobProfession"
      rules={[
        { required: true, message: "Please input profession you want!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, find_job_profession: e.target.value })
        }
      />
    </Form.Item>
  </>);

  const submitForm = (<>
    <Form.Item
      label="Nomor WhatsApp yang dapat dihubungi"
      name="whatsappNumber"
      rules={[
        { required: true, message: "Please input your whatsapp number!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, whatsapp_number: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Nomor Telegram yang dapat dihubungi"
      name="telegramNumber"
      rules={[
        { required: true, message: "Please input your telegram number!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, telegram_number: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Motivasi bergabung ke Palembang Digital"
      name="motivation"
      rules={[
        { required: true, message: "Please input your motivation!" },
      ]}
    >
      <Input
        onChange={(e) =>
          setRegistration({ ...registration, motivation: e.target.value })
        }
      />
    </Form.Item>

    <Form.Item
      label="Dari mana Anda mengetahui Palembang Digital"
      name="informationSource"
      colon={false}
      rules={[
        { required: true, message: "Please choose" },
      ]}
    >
      <Checkbox.Group
        onChange={(checkedValues) => {
          form.validateFields(['informationSourceOther']);
          setRegistration({ ...registration, information_source: checkedValues });
        }}>
        <List itemLayout='vertical'>
          <List.Item>
            <Checkbox value='Website'>Website</Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox value='Instagram'>Instagram</Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox value='Teman'>Teman</Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox value='Dosen'>Dosen</Checkbox>
          </List.Item>
          <List.Item>
            <Checkbox value='Other'>
              Yang lain:
              <Form.Item
                name="informationSourceOther"
                rules={[
                  { required: registration.information_source.indexOf('Other') > -1, message: "Please input source information!" },
                ]}
              >
                <Input
                  disabled={registration.information_source.indexOf('Other') < 0}
                  onChange={(e) =>
                    setRegistration({ ...registration, information_source_other: e.target.value })
                  }
                />
              </Form.Item>
            </Checkbox>
          </List.Item>
        </List>
      </Checkbox.Group>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 4 }}>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => registrationValid(registration) && registerUser(registration)}
      >
        Submit
      </Button>
    </Form.Item>
  </>);

  const forceSubmitForm = (<>
    <div>
      <p>Kami memahami keputusan Anda</p>
      <p>
        <small>
          Walaupun Anda belum menjadi bagian dari keanggotaan Palembang Digital, Anda masih bisa mengikuti kegiatan kami melalui:
          <br />Website: https://palembangdigital.org/
          <br />Instagram: https://www.instagram.com/palembang_digital/
          <br />
          <br />Terima kasih untuk waktunya, semoga kita berjumpa di lain waktu! :)
        </small>
      </p>
    </div>
    <Form.Item wrapperCol={{ offset: 4 }}>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => registrationValid(registration) && registerUser(registration)}
      >
        Submit
      </Button>
    </Form.Item>
  </>);

  const formJobPage = [
    privacyTerm,
    personalInformation,
    jobInformation,
    submitForm
  ];

  const formStudentPage = [
    privacyTerm,
    personalInformation,
    studentInformation,
    submitForm
  ];

  const formFindJobPage = [
    privacyTerm,
    personalInformation,
    findJobInformation,
    submitForm
  ];

  const formNonePage = [
    privacyTerm,
    forceSubmitForm
  ];

  let formPage = formStudentPage;
  if (registration.term === false) {
    formPage = formNonePage;
  } else {
    if (registration.job === 0) {
      formPage = formJobPage
    } else if (registration.job === 1) {
      formPage = formStudentPage
    } else if (registration.job === 2) {
      formPage = formFindJobPage
    } else {
      formPage = formStudentPage
    }
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'next':
        return { page: state.page < formPage.length - 1 ? state.page + 1 : state.page }
      case 'before':
        return { page: state.page > 0 ? state.page - 1 : state.page }
      default:
        return state
    }
  }, { page: 0 });

  return (!isUserInfoLoading
    ? <Form name="basic" form={form} layout="vertical" wrapperCol={{ span: 8 }}>
      <Form.Item>
        <Title level={3}>Complete Your Registration</Title>
      </Form.Item>

      {formPage[state.page]}

      {state.page > 0 && <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            dispatch({ type: 'before' })
          }}
        >
          kembali
        </Button>
      </Form.Item>}
      {state.page < formPage.length - 1 && <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => form.validateFields()
            .then(() => dispatch({ type: 'next' }))}
        >
          Berikutnya
        </Button>
      </Form.Item>}
    </Form>
    : <Skeleton active />
  )
}

export default withAuthorized(Registration);
