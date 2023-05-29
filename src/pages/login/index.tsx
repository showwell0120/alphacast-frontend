import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { redirectToAuthCodeFlow } from '../../apis/spotify';
import { flexColCenter } from '../../bootstrap/classnames';
import styles from './styles.module.scss';

const features = [
  {
    title: '鼓舞人心的故事',
    description: '從非凡的人生故事和成功經歷中獲得靈感',
    bgColor: '#23262F',
  },
  {
    title: '輕鬆分類與管理',
    description: '一目了然的分類，讓收藏的 Podcast 保持整潔',
    bgColor: '#2D3831',
  },
  {
    title: 'Spotify 快速同步',
    description: '透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽',
    bgColor: '#063540',
  },
];

export function Login() {
  return (
    <Row className={classNames('m-0', styles['page-row'])}>
      <Col className={classNames(flexColCenter, 'p-0', styles['left-col'])}>
        <div className={classNames(flexColCenter, styles['logo'])}>
          <img
            className="d-block w-75 mb-6"
            src="./images/logo.png"
            alt="logo"
          />
          <p className={styles['slogan']}>Connecting Stories That Matter</p>
        </div>
        <div className={classNames(flexColCenter, styles['login'])}>
          <Button
            onClick={redirectToAuthCodeFlow}
            variant="spotify"
            size="lg"
            className={styles['button']}
          >
            使用 SPOTIFY 帳號登入
          </Button>
          <div className={styles['signup']}>
            <span>沒有帳號嗎？</span>
            <span>
              {/* @reference: https://pjchender.dev/internet/is-noreferrer-noopenner/ */}
              <a
                target="_blank"
                href="https://www.spotify.com/us/signup"
                rel="noreferrer noopenner"
              >
                註冊帳號
              </a>
            </span>
          </div>
        </div>
      </Col>
      <Col className={classNames('p-0', styles['right-col'])}>
        <Carousel className="vh-100">
          {features.map((feature, index) => (
            <Carousel.Item
              key={`feature-${index}`}
              className="vh-100"
              style={{ backgroundColor: feature.bgColor }}
            >
              <div
                className={classNames(
                  'd-flex flex-column justify-content-start align-items-center w-100 h-100',
                  styles['item-wrap']
                )}
              >
                <div
                  className={classNames(
                    'w-50 position-relative',
                    styles['img-wrap']
                  )}
                >
                  <img
                    className={classNames(
                      'w-100 h-100 position-absolute',
                      styles['img-blur']
                    )}
                    src={`./images/app-feature-${index + 1}.png`}
                    alt={feature.title}
                  />
                  <img
                    className="w-100 h-100 position-absolute"
                    src={`./images/app-feature-${index + 1}.png`}
                    alt={feature.title}
                  />
                </div>
                <Carousel.Caption
                  className={classNames('position-relative', styles['caption'])}
                >
                  <h1 className={styles['title']}>{feature.title}</h1>
                  <p className={styles['desc']}>{feature.description}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}
