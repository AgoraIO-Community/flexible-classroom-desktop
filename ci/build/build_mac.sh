source_root=$(pwd)
ci_source_root=../apaas-cicd-web

build_branch=$open_flexible_classroom_desktop_branch
build_env=$env

ci_script_version=v1
lib_dependencies=(
    agora-rte-sdk
    agora-edu-core
    agora-common-libs
    agora-plugin-gallery
    agora-classroom-sdk
    agora-proctor-sdk
    fcr-ui-scene
)
lib_versions=(
    2.9.1
    2.9.1
    2.9.3
    1.0.0
    2.9.1
    1.0.6
    1.0.1
)
lib_branches=(
    release/2.9.1
    release/2.9.1
    release/2.9.3
    release/2.9.0
    release/2.9.1
    release/1.0.6
    release/1.0.1
)

recording_templates=(
    record_page
    scene_record_page
)

. ../apaas-cicd-web/utilities/tools.sh
. ../apaas-cicd-web/utilities/aws.sh
. ../apaas-cicd-web/build/$ci_script_version/dependency.sh
. ../apaas-cicd-web/build/$ci_script_version/build.sh
. ../apaas-cicd-web/publish/$ci_script_version/publish.sh

if [ "$debug" == "true" ]; then
    # show environment variables
    echo "------------- variables --------------------"
    set
    echo "--------------------------------------------"
fi

download_packages $source_root $build_branch "${lib_dependencies[*]}" "${lib_versions[*]}" "${lib_branches[*]}"

override_packages $source_root

install_packages $source_root

build_demo $source_root $ci_source_root $build_env

publish_web $source_root $build_branch $build_env

publish_recording $source_root $build_env

publish_client $source_root $build_branch $build_env