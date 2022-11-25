<script setup lang="ts">
import { ref } from 'vue'
import { TMail } from '../@types'

const responseCode = ref<object>({})
const loading = ref<boolean>(false)

// METHODS _____________________________________________________________________________________________________________
async function handlerSubmit(evt: any): Promise<void> {
  const { service, from, to, subject, message } = evt.target as { [key: string]: { value: string } }

  const mail: TMail = {
    service: service.value,
    to: to.value.trim(),
    subject: subject.value.trim(),
    message: message.value.trim()
  }

  if (from.value) mail.from = from.value.trim()

  loading.value = true
  const sendedMail = await sendMail(mail)
  if (sendedMail) evt.reset()
}

async function sendMail(mailBody: TMail): Promise<boolean> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/emails/send_mail`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(mailBody)
    })

    const data = await response.json()

    responseCode.value = data
    return true
  } catch (error) {
    const errorMessage = (error as Error).message
    console.error('ERROR-FETCH', errorMessage)
    alert(errorMessage)
    return false
  } finally {
    loading.value = false
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
            <label for="to">To</label>
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

        <div class="output">
          <div class="code-highlight" v-highlight>
            <pre class="language-javascript">
<code>{{responseCode}}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <a href="https://github.com/EdixonAlberto/challenge-chiper">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        <span>Created by Edixon 🍍</span>
      </a>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$color-background: #f5f7f9;
$color-white: #fff;
$color-green: #3d8f5f;
$color-green-dark: #2a6f47;
$color-grey: #dbe1e6;
$color-grey-dark: #75828e;

.app {
  width: 100vw;
  height: 100vh;
  padding-left: 140px;
  padding-right: 140px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;

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
        color: $color-green;
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
        border-radius: 4px;
        box-shadow: 0px 5px 20px -7px $color-grey-dark;

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

            color: $color-grey-dark;
            background: $color-white;
            border: 2px solid $color-grey;
            border-radius: 5px;
            outline: none !important;

            &::placeholder {
              color: $color-grey;
            }

            &:focus-visible {
              border: 2px solid $color-green;
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
          background: $color-green;
          border: none;
          border-radius: 5px;
          outline: none;

          span {
            font-size: 20px;
          }

          &.loading::before {
            content: '';
            height: 20px;
            width: 20px;
            margin: auto;

            position: absolute;
            top: 0;
            bottom: 0;
            right: 80px;

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
            background: $color-green-dark;
          }

          &:disabled {
            cursor: default;
          }
        }
      }

      .output {
        width: 50%;
        height: 100%;
        padding: 20px;

        background: $color-green;
        border-radius: 4px;
        box-shadow: 0px 5px 20px -7px $color-grey-dark;

        .code-highlight,
        pre {
          height: 100%;
          margin: 0;
          overflow-y: hidden;
          overflow-x: auto;
        }
      }
    }
  }

  footer {
    height: 30px;
    margin-left: auto;

    a {
      display: flex;
      justify-content: center;
      column-gap: 5px;

      color: $color-grey-dark;
      text-decoration: none;

      svg {
        width: 20px;
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
    height: 100%;
    padding: 10px 30px;

    main {
      .content-header {
        padding: 0;

        h2 {
          font-size: 20px;
        }

        p {
          padding: 0 20px;
          font-size: 14px;
        }
      }

      .content-main {
        height: 100%;
        flex-direction: column;
        row-gap: 20px;

        form,
        .output {
          width: 100%;
          padding: 20px;
        }

        form {
          .ch-input {
            label,
            input,
            select,
            textarea {
              font-size: 14px;
            }
          }

          button {
            span {
              font-size: 16px;
            }

            &.loading::before {
              right: 40px;
            }
          }
        }

        .output {
          height: max-content;
        }
      }
    }
  }
}
</style>
