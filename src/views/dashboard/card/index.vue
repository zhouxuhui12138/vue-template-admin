<template>
  <div class="card">
    <!-- 栅格布局 实现响应式 -->
    <el-row :gutter="8">
      <!-- 1 -->
      <el-col :span="6">
        <el-card shadow="always">
          <card-detail title="总销售额" count="￥126560">
            <template #charts>
              <span>
                周同比 56.67%
                <svg
                  t="1654054084278"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3300"
                  width="16"
                  height="16"
                  style="position: relative; top: 4px"
                >
                  <path
                    d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z"
                    p-id="3301"
                    fill="#d81e06"
                  ></path>
                </svg>
              </span>
              <span>
                日同比 19.16%
                <svg
                  t="1654054112332"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3531"
                  width="16"
                  height="16"
                  style="position: relative; top: 4px"
                >
                  <path
                    d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z"
                    p-id="3532"
                    fill="#1afa29"
                  ></path>
                </svg>
              </span>
            </template>
            <template #footer>
              <span>日销售额 ￥12423</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <!-- 2 -->
      <el-col :span="6">
        <el-card shadow="always">
          <card-detail title="访问量" count="88460">
            <template #charts>
              <line-charts />
            </template>
            <template #footer>
              <span>日访问量 ￥1234</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <!-- 3 -->
      <el-col :span="6">
        <el-card shadow="always">
          <card-detail title="支付笔数" count="17832">
            <template #charts>
              <bar-charts />
            </template>
            <template #footer>
              <span>转化率 64%</span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
      <!-- 4 -->
      <el-col :span="6">
        <el-card shadow="always">
          <card-detail title="运营活动效果" count="73%">
            <template #charts>
              <progress-charts />
            </template>
            <template #footer>
              <span>
                周同比 56.67%
                <svg
                  t="1654054084278"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3300"
                  width="16"
                  height="16"
                  style="position: relative; top: 4px"
                >
                  <path
                    d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z"
                    p-id="3301"
                    fill="#d81e06"
                  ></path>
                </svg>
              </span>
              <span>
                日同比 19.16%
                <svg
                  t="1654054112332"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3531"
                  width="16"
                  height="16"
                  style="position: relative; top: 4px"
                >
                  <path
                    d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z"
                    p-id="3532"
                    fill="#1afa29"
                  ></path>
                </svg>
              </span>
            </template>
          </card-detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarCharts from './BarCharts.vue'
import CardDetail from "./CardDetail.vue"
import LineCharts from './LineCharts.vue'
import ProgressCharts from './ProgressCharts.vue'
export default {
  components: { CardDetail, LineCharts, BarCharts, ProgressCharts },
}
</script>

<style></style>
