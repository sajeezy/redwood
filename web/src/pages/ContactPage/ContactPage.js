import BlogLayout from 'src/layouts/BlogLayout/BlogLayout'
import {
  Form,
  TextField,
  Label,
  TextAreaField,
  Submit,
  FieldError,
  FormError,
} from '@redwoodjs/forms'
import { useMutation, Flash, useFlash } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const { addMessage } = useFlash()
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      addMessage('Thank you for your submission!', {
        style: { backgroundColor: 'green', color: 'white', padding: '1rem' },
      })
      formMethods.reset()
    },
  })
  const onSubmit = async (data) => {
    try {
      await create({ variables: { input: data } })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <BlogLayout>
      <Flash timeout={2000} />
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Label name="name" errorClassName="error" />
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error" />
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error" />
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
