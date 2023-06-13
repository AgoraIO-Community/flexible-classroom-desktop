source_root=$(pwd)
ci_source_root=../apaas-cicd-web

build_branch=$open_flexible_classroom_desktop_branch
build_env=$env

ci_script_version=v1
lib_dependencies=(
    agora-rte-sdk
    agora-edu-core
    agora-common-libs
    agora-classroom-sdk
    agora-proctor-sdk
    agora-onlineclass-sdk
)

recording_templates=(
    record_page
    onlineclass_record_page
)

. ../apaas-cicd-web/utilities/tools.sh
. ../apaas-cicd-web/utilities/aws.sh
. ../apaas-cicd-web/build/$ci_script_version/dependency.sh
. ../apaas-cicd-web/build/$ci_script_version/build.sh
. ../apaas-cicd-web/publish/$ci_script_version/publish.sh

check_dependencies $source_root $build_branch "${lib_dependencies[*]}"

build_demo $source_root $ci_source_root $build_env

publish_web $source_root $build_branch $build_env

#publish_client $source_root $build_branch $build_env

#publish_recording $source_root $build_env

#publish_share $source_root $build_env