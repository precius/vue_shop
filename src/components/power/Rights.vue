<template>
  <div>
    <!-- 面包屑导航引用 -->
    <Bread nav1="权限管理" nav2="权限列表"></Bread>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
                <el-tag type="warning" v-if="scope.row.level === '2'">三级</el-tag>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有的权限列表
      rightslist: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      // 如果返回状态为异常状态则报错并返回
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      // 如果返回状态正常，将请求的数据保存在data中
      this.rightslist = res.data
    }
  }
}
</script>

<style lang="less" scope></style>
