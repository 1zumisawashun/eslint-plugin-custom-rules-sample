import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from './index'

const ruleTester = new RuleTester()

ruleTester.run(
  'require-should-dirty `const { setValue } = useForm()` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const { setValue } = useForm();
      setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],
    invalid: [
      {
        code: `
      const { setValue } = useForm()
      setValue('fieldName', value, {})
      `,
        output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const { setValue } = useForm()
      setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const { setValue } = useForm()
      setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)

ruleTester.run(
  'require-should-dirty `const { setValue } = useFormContext()` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const { setValue } = useFormContext();
      setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],
    invalid: [
      {
        code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, {})
      `,
        output: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const { setValue } = useFormContext()
      setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)

ruleTester.run(
  'require-should-dirty `const methods = useForm()` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const methods = useForm();
      methods.setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const methods = useForm()
      methods.setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const methods = useForm()
      methods.setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],
    invalid: [
      {
        code: `
      const methods = useForm()
      methods.setValue('fieldName', value, {})
      `,
        output: `
      const methods = useForm()
      methods.setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useForm()
      methods.setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const methods = useForm()
      methods.setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useForm()
      methods.setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const methods = useForm()
      methods.setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)

ruleTester.run(
  'require-should-dirty `const methods = useFormContext()` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const methods = useFormContext();
      methods.setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],
    invalid: [
      {
        code: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, {})
      `,
        output: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const methods = useFormContext()
      methods.setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)

ruleTester.run(
  'require-should-dirty `useForm + const { setValue } = methods` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const methods = useForm()
      const { setValue } = methods;
      setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],

    invalid: [
      {
        code: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, {})
      `,
        output: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const methods = useForm()
      const { setValue } = methods
      setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)

ruleTester.run(
  'require-should-dirty `useFormContext + const { setValue } = methods` pattern',
  rule,
  {
    valid: [
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true });
      `,
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldTouch: true })
      `,
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldDirty: true, shouldValidate: true })
      `,
      },
    ],
    invalid: [
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, {})
      `,
        output: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, {shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldValidate:true })
      `,
        output: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, {shouldValidate:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
      {
        code: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, { shouldTouch: true })
      `,
        output: `
      const methods = useFormContext()
      const { setValue } = methods
      setValue('fieldName', value, {shouldTouch:true,shouldDirty:true})
      `,
        errors: [{ messageId: 'requireShouldDirty' }],
      },
    ],
  },
)
