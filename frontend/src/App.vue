<script setup lang="ts">
import { ref } from 'vue'

const responseCode = ref<object>({})
const loading = ref<boolean>(false)

// METHODS _____________________________________________________________________________________________________________
async function handlerSubmit(evt: any): Promise<void> {
  const { from, to, subject, message } = evt.target as { [key: string]: { value: string } }

  const mail: TMail = {
    to: to.value.trim(),
    subject: subject.value.trim(),
    message: message.value.trim()
  }

  if (from.value) mail.from = from.value.trim()

  loading.value = true
  await sendMail(mail)
  loading.value = false
}

async function sendMail(mailBody: TMail): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/api/emails/send_mail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(mailBody)
    })

    const data = await response.json()
    responseCode.value = data
  } catch (error) {
    console.error('ERROR-FETCH', (error as Error).message)
    return
  }
}
</script>

<template>
  <div class="app">
    <main>
      <div class="content-header">
        <h2>Service Email Fault-Tolerant</h2>
        <p>SPA web app to show the operation of the fault-tolerant email delivery service.</p>
      </div>

      <div class="content-main">
        <form @submit.prevent="handlerSubmit">
          <div class="ch-input">
            <label for="service">Service</label>
            <select name="service">
              <option value="fault-tolerant">fault-tolerant</option>
              <option value="mailgun">Mailgun</option>
              <option value="sendgrid">Sendgrid</option>
            </select>
          </div>

          <div class="ch-input">
            <label for="from">From</label>
            <input type="text" name="from" placeholder="email@example.com" :disabled="loading" />
          </div>

          <div class="ch-input">
            <label for="to">to</label>
            <input type="text" name="to" placeholder="email@example.com" :disabled="loading" />
          </div>

          <div class="ch-input">
            <label for="subject">Subject</label>
            <input type="text" name="subject" placeholder="Subject" :disabled="loading" />
          </div>

          <div class="ch-input">
            <label for="message">Message</label>
            <textarea
              name="message"
              cols="30"
              rows="7"
              placeholder="Write message here..."
              :disabled="loading"
            ></textarea>
          </div>

          <button :class="{ loading }" type="submit" :disabled="loading">
            <span>Send Message</span>
          </button>
        </form>

        <div class="output-container">
          <div class="output" v-highlight>
            <pre class="language-javascript">
<code>{{responseCode}}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
$color-background: #f5f7f9;
$color-white: #fff;
$color-green-light: #3d8f5f;
$color-green-black: #2a6f47;
$color-font: #75828e;
$color-grey: #dbe1e6;

.app {
  width: 100vw;
  height: 100vh;
  padding-left: 140px;
  padding-right: 140px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: $color-background;

  main {
    width: 100%;
    height: auto;
    padding: 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 30px;

    .content-header {
      padding: 0 100px;
      text-align: center;

      h2 {
        margin: 10px 0;
        font-size: 32px;
        font-weight: 600;
        color: $color-green-light;
      }

      p {
        margin: 0;
      }
    }

    .content-main {
      width: 100%;
      height: 660px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 35px;

      form {
        width: 50%;
        height: 100%;
        padding: 20px 40px;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        row-gap: 10px;

        background: $color-white;

        .ch-input,
        input,
        select,
        option,
        textarea,
        label,
        button {
          width: 100%;
          text-align: left;
          background: $color-white;
        }

        .ch-input {
          label {
            font-size: 16px;
            font-weight: 600;
          }

          input,
          select,
          textarea {
            padding: 15px 20px;

            color: $color-font;
            background: $color-white;
            border: 2px solid $color-grey;
            border-radius: 5px;
            outline: none !important;

            &::placeholder {
              color: $color-grey;
            }

            &:focus-visible {
              border: 2px solid $color-green-light;
            }
          }

          select {
            padding-right: 40px;
          }

          textarea {
            resize: none;
          }
        }

        button {
          cursor: pointer;
          padding: 18px 40px;
          position: relative;
          display: flex;
          justify-content: center;

          text-align: center;
          background: $color-green-light;
          border: none;
          border-radius: 5px;
          outline: none;

          span {
            font-size: 20px;
          }

          &.loading::before {
            content: '';
            height: 30px;
            width: 30px;
            margin: auto;

            position: absolute;
            top: 0;
            bottom: 0;
            right: 100px;

            border: 3.5px solid $color-white;
            border-top-color: transparent;
            border-right-color: transparent;
            border-radius: 50%;
            animation: rotating-r 0.8s linear infinite normal;

            @keyframes rotating-r {
              0% {
                transform: rotate(0);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }

          &:hover,
          &:disabled {
            background: $color-green-black;
          }

          &:disabled {
            cursor: default;
          }
        }
      }

      .output-container {
        width: 50%;
        height: 100%;
        padding: 20px;

        background: $color-green-light;

        .output,
        pre {
          height: 100%;
          margin: 0;
          overflow-y: hidden;
          overflow-x: auto;
        }
      }
    }
  }
}

// Desktop big
@media screen and (min-width: 1920px) {
  .app {
    padding: 50px;
    padding-left: 400px;
    padding-right: 400px;

    main {
      row-gap: 30px;

      .content-main {
        height: 740px;

        form {
          padding: 40px;
          row-gap: 20px;
        }
      }
    }
  }
}

// Mobile
@media screen and (max-width: 576px) {
  .app {
  }
}
</style>