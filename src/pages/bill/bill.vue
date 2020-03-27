<template>
    <div>
        <div class="row">
            <!-- begin col-3 -->
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-red">
                    <div class="stats-icon"><i class="fa fa-dollar-sign fa-fw"></i></div>
                    <div class="stats-info">
                        <h4>当日营收</h4>
                        <p>{{day}}</p>
                    </div>
                </div>
            </div>
            <!-- end col-3 -->
            <!-- begin col-3 -->
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-orange">
                    <div class="stats-icon"><i class="fa fa-dollar-sign fa-fw"></i></div>
                    <div class="stats-info">
                        <h4>本周营收</h4>
                        <p>{{week}}</p>
                    </div>
                </div>
            </div>
            <!-- end col-3 -->
            <!-- begin col-3 -->
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-teal">
                    <div class="stats-icon"><i class="fa fa-dollar-sign fa-fw"></i></div>
                    <div class="stats-info">
                        <h4>本月营收</h4>
                        <p>{{month}}</p>
                    </div>
                </div>
            </div>
            <!-- end col-3 -->
            <!-- begin col-3 -->
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-blue">
                    <div class="stats-icon"><i class="fa fa-dollar-sign fa-fw"></i></div>
                    <div class="stats-info">
                        <h4>本年营收</h4>
                        <p>{{year}}</p>
                    </div>
                </div>
            </div>
            <!-- end col-3 -->
        </div>
        <div class="flex-div">
            <el-date-picker
                style="margin-right: 10px"
                class="ma-left"
                v-model="timeValue"
                type="daterange"
                @change="timeChange"
                range-separator=""
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button class="ma-left" @click="search" type="primary">搜索</el-button>
            <el-button class="ma-left" @click="reset">重置</el-button>
        </div>
        <div>
            <el-table
                @filter-change="filterChange"
                :data="tableData"
                style="width: 100%;margin-top: 10px"
                :header-cell-style="{background:'#0E99EC',color:'#ffffff'}">
                <el-table-column
                    prop="StaffName"
                    label="员工账号"
                >
                </el-table-column>

                <el-table-column
                    prop="Orders"
                    label="订单数"
                >
                </el-table-column>
                <el-table-column
                    prop="Many"
                    label="总件树"
                >
                </el-table-column>

                <el-table-column
                    prop="Delay"
                    label="滞留单数"
                >
                </el-table-column>
                <el-table-column
                    prop="NotReceive"
                    label="未付金额">
                </el-table-column>
                <el-table-column
                    prop="ShouldReceive"
                    label="应收">
                </el-table-column>
                <el-table-column
                    prop="Received"
                    label="实收">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filteredName: null,
                filterName: [{text: '张三', value: '张三'}, {text: '李四', value: '李四'}],
                total: 0,
                timeValue: null,
                // eslint-disable-next-line camelcase
                start_date: null,
                // eslint-disable-next-line camelcase
                end_date: null,
                month: 0,
                week: 0,
                day: 0,
                year: 0,
                tableData: []
            };
        },
        mounted() {
            this.getlist();
        },
        methods: {
            getlist() {
                let data = {
                    // eslint-disable-next-line camelcase
                    start_date: this.start_date,
                    // eslint-disable-next-line camelcase
                    end_date: this.end_date
                };
                this.$order.fianceList(data).then(res => {
                    console.log(res);
                    this.day = res.data.Day;
                    this.week = res.data.Week;
                    this.year = res.data.Year;
                    this.month = res.data.Month;
                    this.tableData = res.data.data;
                });
            },
            reset() {
                this.timeValue = null;
                // eslint-disable-next-line camelcase
                this.start_date = null;
                // eslint-disable-next-line camelcase
                this.end_date = null;
                this.getlist();
            },
            search() {
                // eslint-disable-next-line camelcase
                this.start_date = this.timeValue[0];
                // eslint-disable-next-line camelcase
                this.end_date = this.timeValue[1];
                this.getlist();
            },
            timeChange() {
                console.log(this.timeValue);
            },
            filterChange(filteredValue) {

                if (filteredValue.name) {
                    this.filteredName = filteredValue.name[0];
                }
                this.currentPage = 1;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getList();
            }
        }
    };
</script>

<style scoped>
    .flex-div {
        display: flex;
        justify-content: flex-start;
    }

    /deep/ .el-table th > .cell {
        text-align: center;
    }

    /deep/ .el-table .cell {
        text-align: center;
    }

    /deep/ .el-table__column-filter-trigger i {
        color: #ffffff;
    }

    /deep/ .el-table th > .cell.highlight {
        color: #ffffff;
    }
</style>
