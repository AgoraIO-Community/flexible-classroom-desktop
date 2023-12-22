source_root=$(pwd)
ci_source_root=../apaas-cicd-web

build_branch=$open_flexible_classroom_desktop_branch
build_env=$env

ci_script_version=v1

recording_templates=(
    record_page
    scene_record_page
)

. ../apaas-cicd-web/versions.sh
. ../apaas-cicd-web/utilities/tools.sh
. ../apaas-cicd-web/utilities/aws.sh
. ../apaas-cicd-web/build/$ci_script_version/dependency.sh
. ../apaas-cicd-web/build/$ci_script_version/build.sh
. ../apaas-cicd-web/publish/$ci_script_version/publish.sh

# pick up agora-rte-sdk agora-edu-core agora-common-libs agora-plugin-gallery agora-classroom-sdk agora-proctor-sdk fcr-ui-scene
lib_dependencies=(${lib_dependencies[@]:0:7})
lib_versions=(${lib_versions[@]:0:7})
lib_branches=(${lib_branches[@]:0:7})

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
