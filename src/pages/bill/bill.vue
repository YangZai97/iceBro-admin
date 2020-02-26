<template>
    <div>
        <div class="row">
            <!-- begin col-3 -->
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-red">
                    <div class="stats-icon"><i class="fa fa-dollar-sign fa-fw"></i></div>
                    <div class="stats-info">
                        <h4>当日营收</h4>
                        <p>3,291,922</p>
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
                        <p>20.44%</p>
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
                        <p>1,291,922</p>
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
                        <p>100,121,231</p>
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
                    prop="name"
                    label="账号"
                    :filters="filterName"
                    :column-key="'name'"
                    :filter-multiple="false"
                >
                </el-table-column>

                <el-table-column
                    prop="order"
                    label="订单数"
                >
                </el-table-column>
                <el-table-column
                    prop="allNumber"
                    label="总件树"
                >
                </el-table-column>

                <el-table-column
                    prop="rechar"
                    label="滞留单数"
                >
                </el-table-column>
                <el-table-column
                    prop="noMoney"
                    label="未付金额">
                </el-table-column>
                <el-table-column
                    prop="yMoney"
                    label="应收">
                </el-table-column>
                <el-table-column
                    prop="reMoney"
                    label="实收">
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align: center;margin-top: 10px">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :pager-count="5"
                small
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
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
                currentPage: 1,
                timeValue: null,
                tableData: [
                    {
                        name: '小李',
                        order: '130',
                        allNumber: '12',
                        rechar: '1212',
                        noMoney: '11000',
                        yMoney: '212123',
                        reMoney: '4564'
                    },
                    {
                        name: '小李',
                        order: '130',
                        allNumber: '12',
                        rechar: '1212',
                        noMoney: '11000',
                        yMoney: '212123',
                        reMoney: '4564'
                    },
                    {
                        name: '小李',
                        order: '130',
                        allNumber: '12',
                        rechar: '1212',
                        noMoney: '11000',
                        yMoney: '212123',
                        reMoney: '4564'
                    }, {
                        name: '小李',
                        order: '130',
                        allNumber: '12',
                        rechar: '1212',
                        noMoney: '11000',
                        yMoney: '212123',
                        reMoney: '4564'
                    }]
            };
        },
        methods: {
            getlist() {

            },
            reset() {
                this.timeValue = null;
                this.search();
            },
            search() {
                console.log(this.timeValue);
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
