import Breadcrumb from "./Breadcrumb";
import Logo from "./Logo";

const HeaderBrand = () => {
  return (
    <div className="flex items-center space-x-4">
      <Logo />
      <Breadcrumb />
    </div>
  );
};

export default HeaderBrand;
