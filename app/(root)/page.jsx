import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import EnhancedDashboard from "@/components/EnhancedDashboard";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  return <EnhancedDashboard files={files} totalSpace={totalSpace} />;
};

export default Dashboard;