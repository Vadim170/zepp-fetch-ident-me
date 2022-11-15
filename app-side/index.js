import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder()

// Simulating an asynchronous network request using Promise
const mockAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        body: {
          data: {
            text: 'HELLO ZEPPOS'
          }
        }
      })
    }, 1000)
  })
}

const fetchData = async (ctx) => {
  try {
    // Requesting network data using the fetch API
	const res = await fetch({
		url: 'https://ident.me',
		method: 'GET'
	})

    ctx.response({
		data: {
			result: {
				text: res.body
			}
		},
    })
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        return fetchData(ctx)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
